const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please enter a valid task"],
      maxlenght: 50,
      unique:true
    },
    status: {
      type: String,
      enum: ["Done", "Pending", "Discarded", "Postponed"],
      default: "Pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please login First"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
