// Problem Statement: Create a logging middleware for an Express application. The middleware should log detailed information about each incoming request, including the timestamp, HTTP method, URL, request headers, and request body.

// Function Signature:

// /**
//  * Logging middleware for Express
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next function
//  */
// function loggingMiddleware(req, res, next) {
//   // Your implementation here
// }
// Expected Output:

// Each incoming request should be logged with detailed information.
// Test Cases:

// Make multiple requests and check the server logs for detailed information.
// Hint To create a logging middleware for Express, you'll need to define a function that takes req, res, and next as parameters. Inside this function, use console.log to print the timestamp, HTTP method, URL, headers, and body of the incoming request. Finally, call next() to pass control to the next middleware.

// solution:-

const express = require("express");
const app = express();

function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const headers = req.headers;
  const body = req.body;

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log("Headers:", headers);

  if (body) {
    console.log("Body:", body);
  }

  next(); // Pass control to the next middleware
}

// app.use(express.json()); // Use JSON body parser middleware
app.use(loggingMiddleware);

app.get("/log", (req, res) => {
  console.log("Custom log message from /log route");
  res.send("Custom log message logged successfully!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
