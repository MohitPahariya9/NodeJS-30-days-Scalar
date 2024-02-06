// 6. Problem: Express Route Handling

// Problem Statement: You are building a web application using Express in Node.js. Create an Express route to handle GET requests to the endpoint "/greet" that takes a query parameter "name" and returns a personalized greeting. If the name parameter is not provided, the default greeting should be "Hello, Guest!".

// Function Signature:

// /**
//  * Handles GET requests to "/greet" endpoint
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function greetHandler(req, res) {
//   // Your implementation here
// }
// Expected Output:

// If the "name" parameter is provided: "Hello, {name}!"
// If the "name" parameter is not provided: "Hello, Guest!"
// Test Cases:

// Request to /greet?name=John should return "Hello, John!"
// Request to /greet should return "Hello, Guest!"

// solution:-

const express = require("express");
const app = express();
const port = 3000;
function greetHandler(req, res) {
  const name = req.query.name;
  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send(`Hello, Guest!`);
  }
}

// Set up the "/greet" endpoint with the greetHandler function
app.get("/greet", greetHandler);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
