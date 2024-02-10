// solution:-

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// public directory to serve static files
const publicDirectoryPath = path.join(__dirname, 'public');

// Use express.static middleware to serve static files from the public directory
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});