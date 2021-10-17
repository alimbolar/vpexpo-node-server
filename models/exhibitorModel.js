const mongoose = require("mongoose");
const slugify = require("slugify");
// const Organisation = require("./organisationModel");

const exhibitorSchema = new mongoose.Schema({
  exhibitorId: { type: String, required: true },
  isActive: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: [true, "Organisation Name is required"],
  },
  slug: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Org Address is required"],
  },
  city: {
    type: String,
    // required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "Country is needed"],
  },
  latitude: String,
  longitude: String,
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: String,
  logo: {
    type: String,
    default: "logo.jpg",
  },
  profile: {
    type: String,
    default: function() {
      return `We are ${this.name} from ${this.country} and we specialise in${this.category}. We are located at ${this.booth}.`;
    },
  },
  category: Array,
  booth: {
    type: String,
    required: true,
  },
  potential: Array,
  orgEmployee: Array,
});

exhibitorSchema.index({ category: 1 });
// exhibitorSchema.index({ name: 1 });
exhibitorSchema.index({ slug: 1 });
exhibitorSchema.index({ visitorId: 1 });
exhibitorSchema.index({ potential: 1 });

// boothSchema.pre("save", async function(next) {
//   const organisationPromises = await this.organisation.map(
//     async (id) => await Organisation.findById(id)
//   );
//   this.organisation = await Promise.all(organisationPromises);
//   next();
// });

// exhibitorSchema.pre("save", function(next) {
//   this.slug = slugify(this.name, {
//     lowercase: true,
//     strict: true,
//     remove: undefined,
//   });
//   next();
// });

const Exhibitor = mongoose.model("exhibitor", exhibitorSchema);

module.exports = Exhibitor;

// category: {
//   type: String,
//   enum: [
//     "Spectacles And Sunglasses",
//     "Ophthalmic Lenses",
//     "Contact Lens Products",
//     "Instruments, Equipment And Machinery",
//     "Eyewear Accessories",
//     "Optical Tech",
//     "Eye Care Products",
//     "Optical Store Display And Decoration",
//     "Private Label Manufacturing",
//     "Raw Material Supplies",
//   ],
//   required: true,
// },
