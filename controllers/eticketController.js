const fetch = require("node-fetch");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { CONFIG } = require("./../src/config");
const { getAccessToken } = require("./zohoController");

const ZOHO_CONSOLE = "vp-expo-main-console";

const currentToken = {};

exports.addOneExhibitorToCreator = async function(req, res, next) {
  try {
    const token = await getAccessToken();
    const url = process.env.ZOHO_CREATOR_FORM_URL + "/Add_Organisation";
    // const organisation = req.body;
    const organisation = {
      data: {
        isActive: true,
        Organisation_Name: "Test With Alim",
        Type: "Exhibitor",
        Short_Name: "test",
        Email: "test@fourplusmedia.com",
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Zoho-oauthtoken " + token,
      },
      body: JSON.stringify(organisation),
    };

    const functionForResponse = "const response = await fetch(url, options);";

    // const response = await fetch(url, options);
    // const data = await response.json();

    res.status(200).json({
      status: "success",
      token,
      options,
      url,
      organisation,
      functionForResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};

exports.addOneExhibitorToCreatorResponse = async function(req, res, next) {
  try {
    const token = await getAccessToken();
    const url = process.env.ZOHO_CREATOR_FORM_URL + "/Add_Organisation";
    // const organisation = req.body;
    const organisation = {
      data: {
        isActive: true,
        Organisation_Name: "Test With Alim",
        Type: "Exhibitor",
        Short_Name: "test",
        Email: "test@fourplusmedia.com",
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Zoho-oauthtoken " + token,
      },
      body: JSON.stringify(organisation),
    };

    // const functionForResponse = "const response = await fetch(url, options);";

    const response = await fetch(url, options);
    const data = await response.json();

    res.status(200).json({
      status: "success",
      token,
      options,
      url,
      organisation,
      response,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};
