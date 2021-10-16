const fetch = require("node-fetch");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const User = require("./../models/userModel");

exports.addOneVisitor = catchAsync(async function(req, res, next) {
  try {
    const visitor = req.body;

    console.log("eticket-visitor", visitor);

    //TO BE ENABLED IF WE PLAN TO DISALLOW UPDATES AFTER EVENTOID HAS BEEN CREATED
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

    console.log("eticket-data", data);

    const eventoId = data.EvID;
    const visitorId = visitor.VisitorNumber;

    if (eventoId) {
      const user = await User.findOneAndUpdate(
        { visitorId },
        { eventoId },
        {
          new: true,
          runValidators: true,
        }
      );

      console.log("user from eticket", user);

      console.log("eventoId updated", eventoId);

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

    // const visitorForMongo = {
    //   firstName: visitor.FirstName,
    //   lastName: visitor.LastName,
    //   mobile: visitor.Mobile,
    //   email: visitor.Email,
    //   company: visitor.Company,
    //   profile: visitor.JobTitle,
    //   country: visitor.Country,
    //   nationality: visitor.Nationality,
    //   type: visitor.Category,
    //   eventoId,
    // };
    // const user = await User.findOneAndUpdate({ visitorId }, visitorForMongo, {
    //   new: true,
    //   runValidators: true,
    // });

    // console.log("testing mongo within eticket", user);

    // res.status(200).json({
    //   status: "success",
    //   data,
    // });
  } catch (err) {
    console.log(err);
  }
});
