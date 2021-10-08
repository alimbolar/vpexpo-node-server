const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  visitorId: String,
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Email is not valid"],
    // unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "exhibitor", "user", "jury"],
    default: "user",
  },
  company: String,
  address: String,
  city: String,
  country: String,
  mobile: String,
  photo: {
    type: String,
    default: "default.jpg",
  },
  // favourites: [
  //   // List of all booths that the user likes
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Exhibitor",
  //   },
  // ],
  password: {
    type: String,
    default: "4plus+++",
    required: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    default: "4plus+++",
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords don't match. Please try again",
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  preferredLanguage: String,
  profile: String,
  interestedIn: Array,
  ecommerceEnquiry: Array,
  nationality: String,
  residenceCountry: String,
  barcode: String,
  badgeIsPrinted: Boolean,
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
