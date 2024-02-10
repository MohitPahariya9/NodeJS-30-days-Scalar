// . Problem: Express Static Files

// Problem Statement: Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.

// Function Signature:

// /**
//  * Express application serving static files from the "public" directory
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function staticFileServer(req, res) {
//   // Your implementation here
// }
// Expected Output: Accessing the root ("/") should return the content of "public/index.html".

// Test Cases:

// 1.Request to / should return the content of "public/index.html".
// 2.Request to /styles/style.css should return the content of "public/styles/style.css".

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
