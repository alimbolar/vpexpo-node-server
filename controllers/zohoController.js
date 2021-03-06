const fetch = require("node-fetch");
require("dotenv").config();
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { CONFIG } = require("./../src/config");
const User = require("./../models/userModel");
const Exhibitor = require("./../models/exhibitorModel");

const ZOHO_CONSOLE = "vp-expo-main-console";

const currentToken = {};

const importVisitors = catchAsync(async function(data) {
  let visitors = data.map((item) => {
    let visitor = {};
    visitor.firstName = item.Name.first_name;
    visitor.lastName = item.Name.last_name;
    visitor.company = item.Company;
    visitor.address = item.Address.display_value;
    visitor.city = item.Address.district_city;
    visitor.country = item.Address.country;
    visitor.email = item.Email;
    visitor.mobile = item.Mobile;
    visitor.preferredLanguage = item.Preferred_Language;
    visitor.profile = item.Visitor_Profile;
    visitor.interestedIn = item.Exhibitor_Category;
    visitor.visitorId = item.ID;
    visitor.isActive = item.isActive;
    visitor.password = item.Mobile;
    visitor.passwordConfirm = item.Mobile;
    return visitor;
  });

  await User.create(visitors);
});

const importExhibitors = catchAsync(async function(data) {
  console.log(data);

  let exhibitors = data.map((item) => {
    let exhibitor = {};
    exhibitor.name = item.Organisation_Name;
    exhibitor.address = item.Address.display_value;
    exhibitor.city = item.Address.district_city;
    exhibitor.country = item.Address.country;
    exhibitor.latitude = item.Address.latitude;
    exhibitor.longitude = item.Address.longitude;
    exhibitor.email = item.Email;
    exhibitor.phone = item.Phone;
    exhibitor.website = item.Website;
    exhibitor.slug = item.Short_Name;
    exhibitor.category = item.Exhibitor_Category;
    exhibitor.booth = item.Stall_Details;
    exhibitor.profile = item.Exhibitor_Profile;
    exhibitor.exhibitorId = item.ID;
    exhibitor.isActive = item.isActive;
    exhibitor.visits = item.Visits;
    exhibitor.orgEmployee = item.OrgEmployee;
    return exhibitor;
  });

  // console.log(exhibitors);
  await Exhibitor.create(exhibitors);
});

getAccessToken = async () => {
  if (currentToken && currentToken.expirationDate > new Date()) {
    console.log("old currentToken : ", currentToken);
    return currentToken.token;
  }
  try {
    const zohoTokenUrl = `https://accounts.zoho.com/oauth/v2/token?grant_type=refresh_token&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&refresh_token=${process.env.ZOHO_REFRESH_TOKEN}`;
    const tokenResponse = await fetch(zohoTokenUrl, {
      method: "POST",
      body: null,
    });
    const jsonResponse = await tokenResponse.json();

    console.log(jsonResponse);

    if (jsonResponse.access_token) {
      currentToken.token = jsonResponse.access_token;
      currentToken.expirationDate = new Date();
      currentToken.expirationDate.setSeconds(
        currentToken.expirationDate.getSeconds() + jsonResponse.expires_in - 60
      ); // 60 secondes security

      console.log("new currentToken : ", currentToken);
      return currentToken.token;
    }
    console.log("Did not receive a token : " + tokenResponse.status);
  } catch (error) {
    console.log(error);
  }
};

const getFetchOptions = async (overrides) => {
  const token = await getAccessToken();
  const ret = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  if (overrides) return Object.assign(ret, overrides);
  return ret;
};

const sendToZoho = async (uri) => {
  try {
    // if (cache[uri]) return cache[uri].value;

    let doPagination =
      uri.indexOf("limit=") === -1 && uri.indexOf("from=") === -1;

    console.log("doPagination : ", doPagination);

    const options = await getFetchOptions();

    let from = 0;
    let url = process.env.ZOHO_CREATOR_URL + uri;

    console.log(url);

    url +=
      (url.indexOf("?") === -1 ? "?" : "&") +
      "limit=" +
      CONFIG.ZOHO_PAGINATION_LIMIT;

    let zohoResult = await fetch(url, options);

    let result = await zohoResult.json();

    const value = result;
    while (
      doPagination &&
      result.data &&
      result.data.length === CONFIG.ZOHO_PAGINATION_LIMIT
    ) {
      // We are reached the zoho pagination limit
      from += CONFIG.ZOHO_PAGINATION_LIMIT;
      zohoResult = await fetch(url + "&from=" + from, options);
      result = await zohoResult.json();
      if (result.code === 3000 && result.data)
        value.data = value.data.concat(result.data);
    }

    return value;
    // return result;
  } catch (error) {
    console.log(error);
  }
};

exports.getAllData = catchAsync(async (req, res) => {
  let uri = req.url;
  if (uri.indexOf("?") > -1) uri = uri.substring(0, uri.indexOf("?")); // Remove query string

  console.log(uri);

  const jsonResult = await sendToZoho(uri);
  if (jsonResult.code === 3000) {
    let data = jsonResult.data;

    // console.log(data);

    if (uri === "/All_Data") {
      // await User.deleteMany();
      console.log("Users Deleted");
      importVisitors(data);
    }

    if (uri === "/Exhibitor_Report") {
      await Exhibitor.deleteMany();
      console.log("Exhibitors Deleted");
      importExhibitors(data);
    }

    res.status(200).json({
      status: "success",
      result: data.length,
      data,
    });
  } else res.status(500).json(jsonResult);
});

/// TO ADD ENTRY INTO CREATOR USING ZOHO's ADD RECORD API

exports.addOneExhibitorToCreator = catchAsync(async function(req, res, next) {
  const token = await getAccessToken();
  const url = process.env.ZOHO_CREATOR_FORM_URL + "/Add_Organisation";
  const organisation = req.body;
  // const organisation = {
  //   data: {
  //     isActive: true,
  //     Organisation_Name: "Test With Alim",
  //     Type: "Exhibitor",
  //     Short_Name: "test",
  //     Email: "test@fourplusmedia.com",
  //   },
  // };

  console.log(organisation);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Zoho-oauthtoken " + token,
    },
    body: JSON.stringify(organisation),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.updateOneVisitor = catchAsync(async function(req, res, next) {
  const token = await getAccessToken();

  console.log(token);

  const url =
    process.env.ZOHO_CREATOR_REPORT_URL + "/All_Visitors/" + req.params.id;

  const visitor = req.body;
  // const visitor = {
  //   data: {
  //     Visitor_Country: req.body.country,
  //   },
  // };

  console.log(visitor);

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Zoho-oauthtoken " + token,
    },
    body: JSON.stringify(visitor),
  };

  console.log(url);

  const response = await fetch(url, options);
  const data = await response.json();

  console.log(data);

  res.status(200).json({
    status: "success",
    data,
  });
});
