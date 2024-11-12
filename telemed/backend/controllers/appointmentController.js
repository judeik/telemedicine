// backend/controllers/appointmentController.js
const db = require('../config/db');

// Create new appointment
exports.createAppointment = (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
  const sql = 'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled'], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Appointment created successfully' });
  });
};

// View appointments
exports.viewAppointments = (req, res) => {
  const sql = 'SELECT * FROM Appointments WHERE patient_id = ? OR doctor_id = ?';
  db.query(sql, [req.session.patientId, req.session.doctorId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

// Update appointment (reschedule)
exports.updateAppointment = (req, res) => {
  const { id, appointment_date, appointment_time } = req.body;
  const sql = 'UPDATE Appointments SET appointment_date = ?, appointment_time = ? WHERE id = ?';

  db.query(sql, [appointment_date, appointment_time, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Appointment rescheduled successfully' });
  });
};

// Cancel appointment
exports.cancelAppointment = (req, res) => {
  const { id } = req.body;
  const sql = 'UPDATE Appointments SET status = ? WHERE id = ?';

  db.query(sql, ['canceled', id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Appointment canceled successfully' });
  });
};
