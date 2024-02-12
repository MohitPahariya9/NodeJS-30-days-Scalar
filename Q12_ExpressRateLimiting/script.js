// 12. Problem: Express Rate Limiting

// Problem Statement: Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

// Function Signature:

// /**
//  * Rate-limiting middleware for Express
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next function
//  */
// function rateLimitMiddleware(req, res, next) {
//   // Your implementation here
// }
// Expected Output:

// ->If the number of requests from a single IP is below the limit, allow the request to proceed.
// ->If the limit is exceeded, return a 429 Too Many Requests status.
// Test Cases:

// 1.Send requests within the limit; all should proceed.
// 2.Send requests exceeding the limit; some should return a 429 status.



// solution:-

const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

const rateLimitConfig = {
  windowMs: 60 * 1000, //1minute
  maxRequests: 5, //desired limit
  message: "Too many requests from this IP, try again later.",
};

app.use(rateLimit(rateLimitConfig));

function rateLimitMiddleware(req, res, next) {
  next();
}

// Your routes
app.get("/", (req, res) => {
  res.send("Hello its Day 12");
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
