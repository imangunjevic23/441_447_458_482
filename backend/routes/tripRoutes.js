const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

// Provjeri da li se imena funkcija (npr. updateTrip) podudaraju sa onim u kontroleru
router.get('/', tripController.getAllTrips);
router.get('/:id/travelers', tripController.getTripTravelers);
router.post('/', tripController.addTrip);
router.put('/:id', tripController.updateTrip); // Linija 7 - ovdje je bila greška
router.delete('/:id', tripController.deleteTrip);

module.exports = router;