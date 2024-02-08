// 8. Problem: Express Error Handling

// Problem Statement: Create an Express route that throws an error if the request parameter "number" is not a positive integer. Implement an error handling middleware to catch and handle this specific error, returning a custom error message and a 400 Bad Request status.

// Function Signature:

// /**
//  * Express route to handle requests with a positive integer parameter
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function positiveIntegerHandler(req, res) {
//   // Your implementation here
// }
// Expected Output:

// If "number" is a positive integer: Return a success message.
// If "number" is not a positive integer: Trigger an error handled by the error handling middleware.
// Test Cases:

// Request to /positive?number=5 should return a success message.
// Request to /positive?number=-2 should trigger the error handling middleware.

// Solution:-

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON and handle errors
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({
        error:
          `Invalid input. Please provide a positive integer for the ${number} parameter.`
      });
  }
  next(err);
});

function validatePositiveInteger(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    return next();
  } else {
    const error = new Error(
        `Invalid input. Please provide a positive integer for the ${number} parameter.`
    );
    error.name = "ValidationError";
    return next(error);
  }
}

function positiveIntegerHandler(req, res, next) {
  try {
    const number = parseInt(req.query.number);
    res.json({
      message: `Success! The provided number ${number} is a positive integer.`,
    });
  } catch (error) {
    next(error);
  }
}

// Route with the positive integer validation middleware
app.get("/positive", validatePositiveInteger, positiveIntegerHandler);

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});