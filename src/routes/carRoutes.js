import express from 'express';
import carController from '../controllers/carController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, carController.addCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCar);
router.put('/:id', auth, carController.updateCar);
router.delete('/:id', auth, carController.deleteCar);

export default router;