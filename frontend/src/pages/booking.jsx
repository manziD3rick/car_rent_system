import { useState } from "react";
import API from "../services/api";

function Booking({ car }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBooking = async () => {
    const data = {
      car: car._id,
      startDate,
      endDate,
      totalPrice:
        ((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24)) *
        car.pricePerDay,
    };

    try {
      const res = await API.post("/bookings", data);
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Booking failed!");
    }
  };

  return (
    <div>
      <h2>Book {car.brand} {car.model}</h2>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <label>End Date:</label>
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}

export default Booking;