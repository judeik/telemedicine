// index.js

// Import the app from app.js
const app = require('./app');

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
