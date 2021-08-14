const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 💥 :", err.name, err.message);
  console.log("STACK: ", err.stack);
  console.log("Shutting down server....");
  process.exit(1);
});

const app = require("./app");

dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace(
  "{%PASSWORD%}",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"));

PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 💥 :", err.name, err.message);
  console.log("STACK: ", err.stack);
  console.log("Shutting down server....");
  server.close(() => process.exit(1));
});
