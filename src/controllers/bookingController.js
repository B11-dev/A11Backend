import Car from '../models/Car.js';
import Booking from '../models/Booking.js';

const bookingController = {
  bookCar: async (req, res) => {
    const { carId, startDate, endDate, totalPrice } = req.body;

    if (!carId) {
      return res.status(400).json({ error: 'Car ID is required' });
    }

    try {
      const booking = await Booking.create({
        car: carId,
        user: req.user.uid,
        startDate,
        endDate,
        totalPrice,
        status: 'confirmed',
      });

      await Car.findByIdAndUpdate(carId, { $inc: { bookingCount: 1 } });

      res.json({ message: 'Booking successful', booking });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getMyBookings: async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.uid })
        .populate('car')
        .sort({ startDate: -1 });

      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, user: req.user.uid }, // <-- FIXED
        { status: 'canceled' },
        { new: true }
      );

      if (!booking) return res.status(404).json({ error: 'Booking not found or unauthorized' });

      res.json(booking);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  modifyBooking: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const booking = await Booking.findOneAndUpdate(
        { _id: req.params.id, user: req.user.uid }, // <-- FIXED
        { startDate, endDate },
        { new: true }
      );

      if (!booking) return res.status(404).json({ error: 'Booking not found or unauthorized' });

      res.json(booking);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const booking = await Booking.findOneAndDelete({
        _id: req.params.id, // <-- FIXED
        user: req.user.uid,
      });

      if (!booking) return res.status(404).json({ error: 'Booking not found or unauthorized' });

      res.json({ message: 'Booking deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};

export default bookingController;
