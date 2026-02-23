const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");

// Create booking
router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json(booking);
});

// Get all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.find().populate("user car");
  res.json(bookings);
});

module.exports = router;