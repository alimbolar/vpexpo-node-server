const mongoose = require("mongoose");
const Organisation = require("./organisationModel");

const boothSchema = new mongoose.Schema({
  category: {
    type: Array,
  },
  location: {
    type: String,
  },
  visits: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  organisation: Array,
});

boothSchema.pre("save", async function(next) {
  const organisationPromises = await this.organisation.map(
    async (id) => await Organisation.findById(id)
  );

  this.organisation = await Promise.all(organisationPromises);

  next();
});
const Booth = mongoose.model("booth", boothSchema);

module.exports = Booth;
