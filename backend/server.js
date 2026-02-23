const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv =require('dotenv');


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cars", require("./routes/carRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.listen(process.env.PORT, () => 
  console.log(`Server running on port ${process.env.PORT}`)
);