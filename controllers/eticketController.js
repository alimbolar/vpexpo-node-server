const fetch = require("node-fetch");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const User = require("./../models/userModel");

exports.addOneVisitor = catchAsync(async function(req, res, next) {
  try {
    const visitor = req.body;

    console.log(visitor);

    //TO BE ENABLED IF WE PLAN TO ALLOW UPDATES AFTER EVENTOID HAS BEEN CREATED
    ////////////////////////////////
    // if (visitor.eventoId) {
    //   return;
    // }

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

    console.log(data);

    const eventoId = data.EvID;
    const visitorId = visitor.VisitorNumber;

    if (eventoId) {
      const user = await User.findOneAndUpdate({ visitorId }, { eventoId });

      console.log("entoId updated", eventoId);
      res.status(200).json({
        status: "success",
        data,
      });
    }

    if (!eventoId) {
      console.log("Data not saved on evento");
      res.status(200).json({
        status: "fail",
        data,
      });
    }

    // res.status(200).json({
    //   status: "success",
    //   data,
    // });
  } catch (err) {
    console.log(err);
  }
});
