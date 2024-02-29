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

// CustomError class for handling specific application errors
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Sample route that throws a generic error
app.get('/error', (req, res, next) => {
    // Simulate an error
    throw new Error('This is a generic error');
});