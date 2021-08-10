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

const sendErrorDev = function(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = function(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);

    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    sendErrorProd(error, res);
  }
};
