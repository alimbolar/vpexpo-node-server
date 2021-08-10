const express = require("express");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./routers/userRouter");
dotenv.config({ path: `${__dirname}/config.env` });

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.get("/", (req, res) => {
//   res.send("Welcome to VP Expo");
// });

// app.route("/test").get((req, res) => {
//   res.send("Welcome to VP Expo Again");
// });

app.use("/api/v1/users", userRouter);

// PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
