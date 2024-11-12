// controllers/appointmentController.js
const db = require('../config/db');

// Book an appointment
const bookAppointment = (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    db.query(
        'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
        [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'],
        (err) => {
            if (err) return res.status(500).send('Error booking appointment');
            res.send('Appointment booked successfully');
        }
    );
};

// Get appointments for a specific patient or doctor
const getAppointments = (req, res) => {
    const { patient_id, doctor_id } = req.query;

    let sql = 'SELECT * FROM appointments';
    const params = [];

    if (patient_id) {
        sql += ' WHERE patient_id = ?';
        params.push(patient_id);
    } else if (doctor_id) {
        sql += ' WHERE doctor_id = ?';
        params.push(doctor_id);
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).send('Error fetching appointments');
        res.json(results);
    });
};

// Update (reschedule) an appointment
const updateAppointment = (req, res) => {
    const appointmentId = req.params.id;
    const { appointment_date, appointment_time } = req.body;

    db.query(
        'UPDATE appointments SET appointment_date = ?, appointment_time = ?, status = ? WHERE id = ?',
        [appointment_date, appointment_time, 'scheduled', appointmentId],
        (err) => {
            if (err) return res.status(500).send('Error updating appointment');
            res.send('Appointment updated successfully');
        }
    );
};

// Cancel an appointment
const cancelAppointment = (req, res) => {
    const appointmentId = req.params.id;

    db.query(
        'UPDATE appointments SET status = ? WHERE id = ?',
        ['canceled', appointmentId],
        (err) => {
            if (err) return res.status(500).send('Error canceling appointment');
            res.send('Appointment canceled successfully');
        }
    );
};

module.exports = { bookAppointment, getAppointments, updateAppointment, cancelAppointment };
