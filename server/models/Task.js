const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please enter a valid task"],
      maxlenght: 50,
    },
    status: {
      type: String,
      enum: ["done", "pending", "Discarded", "Postponed"],
      default: "pending",
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
