import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  model: String,
  dailyPrice: Number,
  available: Boolean,
  registrationNumber: String,
  features: [String],
  description: String,
  bookingCount: { type: Number, default: 0 },
  imageUrl: String,
  location: String,
  owner: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});

const Car = mongoose.model('Car', carSchema);

export default Car;
