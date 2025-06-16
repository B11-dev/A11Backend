import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
