// api/index.js
const express = require('express');
const app = express();
const path = require('path');

// Import your actual server setup
require('../backend/server')(app);

// Serve static files from frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

module.exports = app;