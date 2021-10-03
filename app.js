const express = require("express");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");

const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/errorController");
// const organisationRouter = require("./routers/organisationRouter");
const exhibitorRouter = require("./routers/exhibitorRouter");
const zohoRouter = require("./routers/zohoRouter");
const viewRouter = require("./routers/viewRouter");
const eticketRouter = require("./routers/eticketRouter");

const app = express();

// Connected to the headers part in createSendToken function. It's purpose is to help it for heroku's x-forwarded-proto option
app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", "./views");

//Serve Static Files
app.use(express.static(`${__dirname}/public`));

dotenv.config({ path: `${__dirname}/config.env` });

// GLOBAL MIDDLEWARES
//Security Headers
app.use(cors());

app.options("*", cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Limit Requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many IP Requests. Try again in an hour",
});

app.use("/api", limiter);

// Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//Data Sanitization
app.use(mongoSanitize());
app.use(xss());

// Test Middleware
app.use((req, res, next) => {
  console.log(req.cookies.jwt);
  next();
});

app.use(compression());

// ROUTES
app.use("/", viewRouter);
app.use("/api/v1/zoho", zohoRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/organisations", organisationRouter);
app.use("/api/v1/exhibitors", exhibitorRouter);
app.use("/api/v1/eticket", eticketRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`This route ${req.originalUrl} does not exist`, 404);
  next(err);
});

app.use(globalErrorController);

module.exports = app;
