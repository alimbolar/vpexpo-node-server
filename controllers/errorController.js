const AppError = require("./../utils/AppError");

const handleCastErrorDB = function(err) {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = function(err) {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(". ");
  const message = `Validation Errors : ${errors}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = function(err) {
  const [error] = Object.entries(err.keyValue);
  const message = `This field '${error[0]}' has duplicate value of '${
    error[1]
  }'`;
  return new AppError(message, 400);
};

const sendErrorDev = function(err, req, res) {
  console.log(err);
  // A) API URLs
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) RENDERED WEBSITE URLs

  return res.status(err.statusCode).render("error", {
    title: "Something went wrong...",
    message: err.message,
  });
};

const sendErrorProd = function(err, req, res) {
  console.log(err);
  // A) API URLs
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Something went wrong...",
    });
  }
  // B) RENDERED WEBSITE URLs
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong",
      msg: err.message,
    });
  }

  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg:
      "Something went wrong. Please bang your head against the wall a minimum or 5 times before trying again!",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    // error.message = err.message;

    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    sendErrorProd(error, req, res);
  }
};
