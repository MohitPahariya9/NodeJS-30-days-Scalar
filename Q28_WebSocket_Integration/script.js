// Problem 28: WebSocket Integration

// Problem Statement: You are developing a real-time collaborative editing tool using Node.js and Express. You need to integrate WebSocket functionality to allow users to see changes made by others in real-time. Design a solution to establish WebSocket connections, handle incoming messages, and broadcast changes to all connected clients efficiently.

// Function Signature:

// function setupWebSocketServer(server) {
//     // Your implementation here
// }

// solution:-

const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./setupWebSocketServer');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello, this is the home page!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// Setup WebSocket server
setupWebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


