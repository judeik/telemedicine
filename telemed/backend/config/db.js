// db.js
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',   // or the hostname of your database server
  user: 'root',        // your database username
  password: '',        // your database password
  database: '', // name of your database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database with id ' + db.threadId);
});

module.exports = db;
