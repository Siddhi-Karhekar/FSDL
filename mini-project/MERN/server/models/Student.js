const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    rollId: {
      type: String,
      required: [true, "Roll ID is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
