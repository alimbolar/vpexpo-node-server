const express = require("express");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/errorController");
const organisationRouter = require("./routers/organisationRouter");
const boothRouter = require("./routers/boothRouter");

const app = express();

dotenv.config({ path: `${__dirname}/config.env` });

// GLOBAL MIDDLEWARES
//Security Headers
app.use(helmet());

// Limit Requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many IP Requests. Try again in an hour",
});

app.use("/api", limiter);

// Body Parser
app.use(express.json());

//Data Sanitization
app.use(mongoSanitize());
app.use(xss());

//Serve Static Files
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/organisations", organisationRouter);
app.use("/api/v1/booths", boothRouter);
app.all("*", (req, res, next) => {
  const err = new AppError(`This route ${req.originalUrl} does not exist`, 404);
  next(err);
});

app.use(globalErrorController);

module.exports = app;
