const fs = require("fs");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Exhibitor = require("./../models/exhibitorModel");
const zohoController = require("./../controllers/zohoController");

dotenv.config({ path: "./config.env" });

// dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace(
  "{%PASSWORD%}",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

const exhibitors = JSON.parse(
  fs.readFileSync(`${__dirname}/visitors.json`, "utf-8")
);

const url =
  "https://creator.zoho.com/api/v2/fourplusindia/vp-expo-main-console/report/All_Data";

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      "1000.56faa9e338bd5dacd1df5a85395441ba.81ab2c444641700591a4c2db2afaa89b",
  },
};

fetch(url, fetchOptions)
  .then((response) => response.json())
  .then((data) => Exhibitor.create(data));

// console.log(tours);

const importData = async () => {
  try {
    await Exhibitor.create(exhibitors);
    console.log("Data added successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Exhibitor.deleteMany();
    console.log("DB Deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);

if (process.argv[2] === "--delete") {
  deleteData();
}

if (process.argv[2] === "--import") {
  importData();
}
