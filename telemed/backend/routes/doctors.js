// routes/doctors.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const auth = require('../middleware/auth');

// Doctor registration
router.post('/register', doctorController.register);

// Doctor login
router.post('/login', doctorController.login);

// Doctor logout
router.get('/logout', doctorController.logout);

// Doctor profile management
router.get('/profile', auth, doctorController.viewProfile);
router.post('/profile/edit', auth, doctorController.editProfile);

module.exports = router;

