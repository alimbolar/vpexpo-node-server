const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Organisation Name is required"],
  },
  address: {
    type: String,
    required: [true, "Org Address is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "Country is needed"],
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  profile: {
    type: String,
  },
});

const Organisation = mongoose.model("organisation", organisationSchema);

module.exports = Organisation;
