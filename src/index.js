const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from DevOps Node.js app!');
  res.send('Hello I am Rahul...');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

