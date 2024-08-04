const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    Name: {
        type: String,
        required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", user);
