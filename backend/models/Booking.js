const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: { type: String, default: "booked" }
});

module.exports = mongoose.model("Booking", bookingSchema);