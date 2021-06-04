const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    rollNumber: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", customerSchema);
