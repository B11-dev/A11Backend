import express from 'express';
import auth from '../middleware/authMiddleware.js';
import bookingCtrl from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', auth, bookingCtrl.bookCar);
router.get('/my', auth, bookingCtrl.getMyBookings);
router.patch('/:id/cancel', auth, bookingCtrl.cancelBooking);
router.patch('/:id/modify', auth, bookingCtrl.modifyBooking);
router.delete('/:id', auth, bookingCtrl.deleteBooking);

export default router;
