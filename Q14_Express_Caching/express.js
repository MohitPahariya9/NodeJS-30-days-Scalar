// 14. Problem: Express Caching Middleware

// Problem Statement: Implement a caching middleware for an Express application. The middleware should cache responses based on the request URL and return cached responses for subsequent identical requests. Allow cache expiration after a specified time.

// Function Signature:

// /**
//  * Caching middleware for Express
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next function
//  */
// function cachingMiddleware(req, res, next) {
//   // Your implementation here
// }
// Expected Output:

// Cached responses should be returned for identical requests within the cache expiration time.
// Subsequent requests after cache expiration should trigger a new response.
// Test Cases:

// Make a request, cache the response, and make the same request again within the cache expiration time.
// Make a request, cache the response, wait for cache expiration, and make the same request again.

// Solution:-

const express = require('express');
const memoryCache = require('memory-cache');

const app = express();

const cacheDuration = 60 * 1000; // Cache expiration time in milliseconds (1 minute)

function cachingMiddleware(req, res, next) {
    const cacheKey = req.originalUrl; // Use the original URL for caching
  
    // Check for cached response
    const cachedResponse = memoryCache.get(cacheKey);
    if (cachedResponse) {
      if (Date.now() - cachedResponse.timestamp < cacheDuration) {
        // Cache hit: return cached response with date stamp
        const responseWithDateStamp = {
          timestamp: cachedResponse.timestamp,
          data: cachedResponse.data,
        };
  
        res.json(responseWithDateStamp);
        return;
      } else {
        // Cache expired: remove from cache
        memoryCache.remove(cacheKey);
      }
    }
  
    // Cache miss: proceed to the next middleware and cache the response
    const originalJson = res.json.bind(res); // Preserve the original json method
    res.json = function (data) {
      const responseToCache = {
        timestamp: Date.now(),
        data: data,
      };
  
      memoryCache.put(cacheKey, responseToCache, cacheDuration);
      originalJson(responseToCache); // Send the response with date stamp
    };
  
    next();
  }
  
  
  

// Example usage:
app.get('/cache', cachingMiddleware, (req, res) => {
  // Logic to generate response data
  res.json({ message: 'Hello from the cached endpoint!' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});