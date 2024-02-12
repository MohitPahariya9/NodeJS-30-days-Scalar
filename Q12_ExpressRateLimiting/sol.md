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