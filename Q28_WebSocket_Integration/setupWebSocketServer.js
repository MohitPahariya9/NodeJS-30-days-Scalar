const WebSocket = require("ws");

function setupWebSocketServer(server) {
  // Create a WebSocket server by passing the HTTP server instance
  const wss = new WebSocket.Server({ server });

  // Store connected clients to manage broadcasting
  const clients = new Set();

  // Event handler for new WebSocket connections
  wss.on("connection", (ws) => {
    // Add the new client to the set
    clients.add(ws);

    // Event handler for receiving messages from a client
    ws.on("message", (message) => {
      // Handle the incoming message, e.g., broadcast it to all connected clients
      broadcastMessage(message);
    });

    // Event handler for closing a WebSocket connection
    ws.on("close", () => {
      // Remove the client from the set when the connection is closed
      clients.delete(ws);
    });
  });

  // Function to broadcast a message to all connected clients
  function broadcastMessage(message) {
    clients.forEach((client) => {
      // Check if the client connection is still open before sending
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

module.exports = setupWebSocketServer;
