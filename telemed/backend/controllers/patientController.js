// patientController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerPatient = async (req, res) => {
    const { username, first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO patients (username, first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [username, first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address],
        (err) => {
            if (err) return res.status(500).send('Error registering patient');
            res.send('Patient registered successfully');
        }
    );
};

const loginPatient = (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM patients WHERE email = ?', [email], async (err, results) => {
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password_hash))) {
            return res.status(401).send('Invalid credentials');
        }
        req.session.patientId = results[0].id;
        res.send('Logged in successfully');
    });
};

const viewProfile = (req, res) => {
    const patientId = req.session.patientId;
    db.query('SELECT * FROM patients WHERE id = ?', [patientId], (err, results) => {
        if (err || results.length === 0) return res.status(404).send('Patient not found');
        res.json(results[0]);
    });
};

const updateProfile = (req, res) => {
    const patientId = req.session.patientId;
    const { first_name, last_name, phone, date_of_birth, gender, address } = req.body;
    db.query(
        'UPDATE patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?',
        [first_name, last_name, phone, date_of_birth, gender, address, patientId],
        (err) => {
            if (err) return res.status(500).send('Error updating profile');
            res.send('Profile updated successfully');
        }
    );
};

const deletePatient = (req, res) => {
    const patientId = req.session.patientId;
    db.query('DELETE FROM patients WHERE id = ?', [patientId], (err) => {
        if (err) return res.status(500).send('Error deleting account');
        req.session.destroy();
        res.send('Account deleted successfully');
    });
};

module.exports = { registerPatient, loginPatient, viewProfile, updateProfile, deletePatient };
