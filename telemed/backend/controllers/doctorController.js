const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new doctor
exports.register = (req, res) => {
  const { username, first_name, last_name, specialization, email, phone, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO Doctors (username, first_name, last_name, specialization, email, phone, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [username, first_name, last_name, specialization, email, phone, hashedPassword], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: 'Doctor registered successfully' });
  });
};

// Doctor login
exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM Doctors WHERE username = ?';

  db.query(sql, [username], (err, results) => {
    if (err || results.length === 0 || !bcrypt.compareSync(password, results[0].password_hash)) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    req.session.doctorId = results[0].id;
    res.status(200).send({ message: 'Login successful' });
  });
};

// Doctor logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.send({ message: 'Logged out successfully' });
};

// View doctor profile
exports.viewProfile = (req, res) => {
  const sql = 'SELECT * FROM Doctors WHERE id = ?';
  db.query(sql, [req.session.doctorId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
};

// Edit doctor profile
exports.editProfile = (req, res) => {
  const { first_name, last_name, specialization, phone } = req.body;
  const sql = 'UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, phone = ? WHERE id = ?';

  db.query(sql, [first_name, last_name, specialization, phone, req.session.doctorId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Profile updated successfully' });
  });
};
