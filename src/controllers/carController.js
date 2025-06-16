import Car from '../models/Car.js';

const carController = {
  addCar: async (req, res) => {
    try {
      const car = new Car({
        ...req.body,
        owner: req.user.uid, // Set owner to logged-in user's UID
      });
      await car.save();
      res.status(201).json(car);
    } catch (err) {
      res.status(400).json({ error: "Failed to add car" });
    }
  },

  getCars: async (req, res) => {
    try {
      const my = req.query.my === "true";
      let filter = {};
      if (my && req.user) {
        filter.owner = req.user.uid;
      }
      const cars = await Car.find(filter).sort({ dateAdded: -1 });
      res.json(cars);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getCar: async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ error: "Car not found" });
      }
      res.json(car);
    } catch (err) {
      res.status(400).json({ error: "Invalid car ID" });
    }
  },

  updateCar: async (req, res) => {
    try {
      const car = await Car.findOneAndUpdate(
        { _id: req.params.id, owner: req.user.uid }, // Use UID
        req.body,
        { new: true }
      );
      if (!car) return res.status(404).json({ error: 'Car not found or unauthorized' });
      res.json(car);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteCar: async (req, res) => {
    try {
      const car = await Car.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.uid, // Use UID
      });
      if (!car) {
        return res.status(404).json({ error: "Car not found or unauthorized" });
      }
      res.json({ message: "Car deleted" });
    } catch (err) {
      res.status(400).json({ error: "Invalid car ID" });
    }
  }
};

export default carController;
