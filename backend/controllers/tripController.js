const Trip = require('../models/trip');

// Dobavljanje svih putovanja
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Dodavanje putovanja
exports.addTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ažuriranje putovanja (Ovo je ono što fali ili je pogrešno!)
exports.updateTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Trip.update(req.body, { where: { id: id } });
        if (updated) {
            const updatedTrip = await Trip.findByPk(id);
            return res.status(200).json(updatedTrip);
        }
        throw new Error('Trip not found');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Brisanje putovanja
exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Trip.destroy({ where: { id: id } });
        if (deleted) {
            return res.status(204).send("Trip deleted");
        }
        throw new Error('Trip not found');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};