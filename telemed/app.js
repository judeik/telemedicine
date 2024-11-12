// Import dependencies
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const csurf = require('csurf');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./backend/config/db'); // MySQL connection
const { authenticateToken } = require('./backend/middleware/auth');

// Import routes
const patientRoutes = require('./backend/routes/patients');
const doctorRoutes = require('./backend/routes/doctors');
const appointmentRoutes = require('./backend/routes/appointments');
const adminRoutes = require('./backend/routes/admin');

const app = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
  origin: 'https://your-frontend-domain.com', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// CSRF Protection
app.use(csurf({ cookie: true }));

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes setup
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', authenticateToken, appointmentRoutes);
app.use('/admin', authenticateToken, adminRoutes);

// Default route to serve frontend landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Custom error handling for CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
