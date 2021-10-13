const fetch = require("node-fetch");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const { CONFIG } = require("./../src/config");
// const axios = require("axios");
const User = require("./../models/userModel");
const { findOneAndUpdate } = require("./../models/userModel");

exports.addOneVisitor = async function(req, res, next) {
  try {
    const visitor = req.body;

    url = "https://online.evsreg.com/VPEXPOAPI/API/Visitor/VisitorInsert";
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic RXZlbnRvX1ZQRVhQTzpCNEE3RjIzNDkyNkUyNjVFMTBEM0ZFREI2RTEzRA==",
      },
      body: JSON.stringify(visitor),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("response", data.EvID);
    const eventoID = data.EvID;
    const visitorId = visitor.VisitorNumber;

    console.log(visitorId);

    if (eventoID) {
      const user = await User.findOneAndUpdate({ visitorId }, { eventoId });
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
