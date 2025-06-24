const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Rate limit: 5 requests per second
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5,         // limit each IP to 5 requests per second
  message: 'Too many requests. Please wait a second.'
});

app.use(limiter); // Apply to all routes

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
