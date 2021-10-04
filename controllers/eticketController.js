const fetch = require("node-fetch");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { CONFIG } = require("./../src/config");
const { getAccessToken } = require("./zohoController");

const ZOHO_CONSOLE = "vp-expo-main-console";

const currentToken = {};

exports.addOneExhibitorToCreator = catchAsync(async function(req, res, next) {
  console.log("hello");

  const token = await getAccessToken();
  const url = process.env.ZOHO_CREATOR_FORM_URL + "/Add_Organisation";
  // const data = req.body;
  const data = {
    data: {
      isActive: true,
      Organisation_Name: "Test With Alim",
      Type: "Exhibitor",
      Short_Name: "test",
      Email: "test@fourplusmedia.com",
    },
  };

  const options = {
    Method: "POST",
    Headers: {
      "Content-Type": "application/json",
      Authorization: "Zoho-oauthtoken " + token,
    },
    body: JSON.stringify(data),
  };

  const functionForResponse = "const response = await fetch(url, options);";

  // const response = await fetch(url, options);

  res.status(200).json({
    status: "success",
    token,
    options,
    url,
    data,
    functionForResponse,
  });
});

exports.addOneExhibitorToCreatorResponse = catchAsync(async function(
  req,
  res,
  next
) {
  const token = await getAccessToken();
  const url = process.env.ZOHO_CREATOR_FORM_URL + "/Add_Organisation";
  // const data = req.body;
  const data = {
    data: {
      isActive: true,
      Organisation_Name: "Test With Alim",
      Type: "Exhibitor",
      Short_Name: "test",
      Email: "test@fourplusmedia.com",
    },
  };

  const options = {
    Method: "POST",
    Headers: {
      "Content-Type": "application/json",
      Authorization: "Zoho-oauthtoken " + token,
    },
    body: JSON.stringify(data),
  };

  const functionForResponse = "const response = await fetch(url, options);";

  const response = await fetch(url, options);

  res.status(200).json({
    status: "success",
    token,
    options,
    url,
    data,
    functionForResponse,
  });
});
