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
  const data = req.body;

  const options = {
    Method: "POST",
    Headers: {
      "Content-Type": "application/json",
      Authorization: "Zoho-oauthtoken " + token,
    },
    body: data,
  };

  // const response = await fetch(url, options);

  res.status(200).json({
    status: "success",
    token,
    options,
    url,
    data,
    // response,
  });
});
