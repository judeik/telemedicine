// routes/getAppointments.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// Create new appointment
router.post('/create', auth, appointmentController.createAppointment);

// View appointments (for doctors and patients)
router.get('/view', auth, appointmentController.viewAppointments);

// Update appointment (reschedule)
router.post('/update', auth, appointmentController.updateAppointment);

// Cancel appointment
router.post('/cancel', auth, appointmentController.cancelAppointment);

module.exports = router;
