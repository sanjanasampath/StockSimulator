const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "An account with this username already exists."],
      minlength: [4, "Username must be 4-15 characters."],
      maxlength: [15, "Username must be 4-15 characters."],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    email: {
      type:String,
      required: [true, "Email is required."],
      unique: [true, "An account with this email already exists."],
    },
    balance:{
      type: Number,
      required: true,
      default: 1000
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
