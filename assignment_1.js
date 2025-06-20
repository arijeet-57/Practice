const express = require('express');
const app = express();

let totalRequestTime = 0;
let requestCount = 0;

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    totalRequestTime += duration;
    requestCount++;
    console.log(`Request took ${duration} ms`);
  });

  next();
});

app.get('/', (req, res) => {
  // Simulate processing
  setTimeout(() => {
    res.send('Hello World');
  }, Math.floor(Math.random() * 100));
});

app.get('/average-time', (req, res) => {
  if (requestCount === 0) return res.send('No requests recorded yet.');
  const averageTime = totalRequestTime / requestCount;
  res.send(`Average request time: ${averageTime.toFixed(2)} ms`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
