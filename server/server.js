require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
// const booksRouter = require('./routes/books-route')

// Set default port for express app
const PORT = process.env.PORT || 3000;

// Create express app
const app = express();

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);

// Apply middleware
// Note: Keep this at the top, above routes
// Setup the logger
app.use(morgan('common', { stream: accessLogStream }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Implement books route
// app.use('/books', booksRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is broken.');
});

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.');
});

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
