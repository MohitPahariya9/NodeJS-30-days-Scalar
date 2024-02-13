const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Serve HTML page with WebSocket connection setup
app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/websocket.html');
});

// WebSocket server setup
function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // WebSocket message handler
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      
      // Echo the received message back to the client
      ws.send(`Server echoed: ${message}`);
    });

    // WebSocket close handler
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

// Setup WebSocket on the existing serverno
setupWebSocket(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
