// Problem 29: Error Handling Middleware

// Problem Statement: You are developing a complex web application with multiple routes and middleware in Node.js and Express. You want to implement a centralized error handling mechanism to catch and handle errors gracefully without crashing the server. Design a middleware function that intercepts errors thrown by route handlers or other middleware and sends an appropriate error response to the client.

// Function Signature:

// function errorHandler(err, req, res, next) {
//     // Your implementation here
// }

// solution:-

const express = require('express');
const bodyParser = require('body-parser');

// CustomError class for handling specific application errors
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

const app = express();
app.use(express.json());

// Middleware for handling errors
function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err);

    // Set a default status code and error message
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    // Customize error response based on the type of error
    if (err instanceof SyntaxError && err.status === 400) {
        // Handle JSON parsing error
        statusCode = 400;
        errorMessage = 'Bad Request - Invalid JSON';
    } else if (err instanceof CustomError) {
        // Handle custom application-specific errors
        statusCode = err.statusCode;
        errorMessage = err.message;
    }

    // Send the error response to the client
    res.status(statusCode).json({ error: errorMessage });
}

// Sample route that throws a generic error
app.get('/error', (req, res, next) => {
    // Simulate an error
    next(new Error('This is a generic error'));
});

// Sample route that throws a custom error
app.get('/custom-error', (req, res, next) => {
    // Simulate a custom error
    const customError = new CustomError(404, 'Not Found - Custom Error');
    next(customError);
});


app.post('/json-error', (req, res, next) => {
    try {
        
        JSON.parse('{ "invalid_json": }');
    } catch (error) {
        // If an error occurs during parsing, pass it to the next middleware
        return next(new SyntaxError('Bad Request - Invalid JSON'));
    }

    // If parsing succeeds, continue to the next middleware or route
    next();
});


// Use the errorHandler middleware at the end to catch errors
app.use(errorHandler);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


