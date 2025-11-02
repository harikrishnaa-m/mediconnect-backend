const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialisation: { type: String, required: true },
  fee: { type: Number, required: true },
  pic: { type: String, required: true },
});

module.exports = mongoose.model("doctors", doctorSchema);
