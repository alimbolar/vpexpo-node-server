const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./routers/userRouter");
dotenv.config({ path: `${__dirname}/config.env` });
const AppError = require("./utils/AppError");
const globalErrorController = require("./controllers/errorController");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.get("/", (req, res) => {
//   res.send("Welcome to VP Expo");
// });

// app.route("/test").get((req, res) => {
//   res.send("Welcome to VP Expo Again");
// });

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const err = new AppError(`This route ${req.originalUrl} does not exist`, 404);
  next(err);
});

app.use(globalErrorController);

// PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
