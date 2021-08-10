const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords don't match. Please try again",
    },
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
