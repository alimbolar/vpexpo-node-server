const express = require("express");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/errorController");
// const organisationRouter = require("./routers/organisationRouter");
const exhibitorRouter = require("./routers/exhibitorRouter");
const zohoRouter = require("./routers/zohoRouter");
const viewRouter = require("././routers/viewRouter");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", viewRouter);

//Serve Static Files
app.use(express.static(`${__dirname}/public`));

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

// ROUTES

app.use("/api/v1/zoho", zohoRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/organisations", organisationRouter);
app.use("/api/v1/exhibitors", exhibitorRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`This route ${req.originalUrl} does not exist`, 404);
  next(err);
});

app.use(globalErrorController);

module.exports = app;
