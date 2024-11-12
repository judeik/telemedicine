// route/patients
const express = require('express');
const { registerPatient, loginPatient, viewProfile, updateProfile, deletePatient } = require('../controllers/patientController');
const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.get('/profile', viewProfile);
router.put('/profile', updateProfile);
router.delete('/delete', deletePatient);

module.exports = router;
