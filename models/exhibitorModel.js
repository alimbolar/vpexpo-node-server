const mongoose = require("mongoose");
const slugify = require("slugify");
// const Organisation = require("./organisationModel");

const exhibitorSchema = new mongoose.Schema({
  category: {
    type: Array,
  },
  booth: {
    type: String,
  },
  visits: [
    {
      // List of all visitors that the booth has received
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  name: {
    type: String,
    // required: [true, "Organisation Name is required"],
  },
  slug: {
    type: String,
  },
  address: {
    type: String,
    // required: [true, "Org Address is required"],
  },
  city: {
    type: String,
    // required: [true, "City is required"],
  },
  country: {
    type: String,
    // required: [true, "Country is needed"],
  },
  latitude: String,
  longitude: String,
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  profile: {
    type: String,
    default: function() {
      return `We are ${this.name} from ${this.country} and we specialise in${this.category}. We are located at ${this.booth}.`;
    },
  },
  creatorID: String,
  website: String,
  shortName: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

exhibitorSchema.index({ category: 1 });
// exhibitorSchema.index({ name: 1 });
exhibitorSchema.index({ slug: 1 });

// boothSchema.pre("save", async function(next) {
//   const organisationPromises = await this.organisation.map(
//     async (id) => await Organisation.findById(id)
//   );
//   this.organisation = await Promise.all(organisationPromises);
//   next();
// });

exhibitorSchema.pre("save", function(next) {
  this.slug = slugify(this.name, {
    lowercase: true,
    strict: true,
    remove: undefined,
  });
  next();
});

const Exhibitor = mongoose.model("exhibitor", exhibitorSchema);

module.exports = Exhibitor;
