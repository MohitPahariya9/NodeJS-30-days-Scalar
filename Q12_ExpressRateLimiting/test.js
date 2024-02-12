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

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
    const maxRequests = 5; // Set your desired limit here
    const windowMs = 60000; // Set your desired time window in milliseconds (e.g., 1 minute)
    
    // Get client IP address
    const clientIp = req.ip;
  
    // Check if IP is in the request headers (for use behind a proxy)
    // const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    // Initialize the IP address entry in the requests tracking object if not exists
    if (!req.rateLimit) {
      req.rateLimit = {};
    }
  
    // Initialize the request count for the current IP address
    if (!req.rateLimit[clientIp]) {
      req.rateLimit[clientIp] = {
        count: 0,
        resetTime: Date.now() + windowMs,
      };
    }
  
    // Check if the reset time has passed, and if so, reset the count
    if (req.rateLimit[clientIp].resetTime < Date.now()) {
      req.rateLimit[clientIp].count = 0;
      req.rateLimit[clientIp].resetTime = Date.now() + windowMs;
    }
  
    // Check if the request count exceeds the limit
    if (req.rateLimit[clientIp].count >= maxRequests) {
      // Return a 429 Too Many Requests status if the limit is exceeded
      return res.status(429).json({ error: 'Too Many Requests' });
    }
  
    // Increment the request count for the current IP address
    req.rateLimit[clientIp].count += 1;
  
    // Call the next middleware if the limit is not exceeded
    next();
  }
  
  // Example usage in your Express app
  const express = require('express');
  const app = express();
  
  // Apply rate-limiting middleware to all routes
  app.use(rateLimitMiddleware);
  
  // Your routes
  app.get('/',(req,res)=>{
    res.send('Hello its Day 12')
  })
  
  // Start the Express server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
