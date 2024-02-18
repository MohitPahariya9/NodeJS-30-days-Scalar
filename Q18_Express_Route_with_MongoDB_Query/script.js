// 18. Problem: Express Route with MongoDB Query

// Problem Statement: Create an Express route that retrieves all users from the MongoDB database and returns them as a JSON response.

// Function Signature:

// /**
//  * Express route to get all users from MongoDB
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function getAllUsers(req, res) {
//   // Your implementation here
// }
// Expected Output:

// ->Return a JSON response with an array of user objects.

// Test Cases:

// 1.Access the route /users and check if the response contains the expected user data.

// Hint:

// Import Required Modules: Import the necessary modules, such as express, mongoose, and any other modules required for your application.

// Define User Model: If you haven't already, define a User schema and create a User model using Mongoose.

// Connect to MongoDB: Use Mongoose to connect to your MongoDB database. Ensure that the connection is established before defining your route.

// Create Express Route: Define an Express route using app.get() that listens for requests to /users.

// Implement Route Handler: In the route handler function (getAllUsers), use the User.find() method to retrieve all users from the database. Handle any errors that occur during the query.

// Return JSON Response: If the query is successful, send a JSON response containing the array of user objects. If there is an error, send an appropriate error response.

// Start Express Server: Finally, start your Express server and listen on a specific port (e.g., 3000).

// solution:-

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/Node30DayChallenge");

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Define Mongoose Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Express route to get all users from MongoDB
app.get('/users', async (req, res) => {
    try {
      // Use async/await syntax to retrieve all users from the database
      const users = await User.find({});
      // If the query is successful, send a JSON response with the array of user objects
      res.json(users);
    } catch (error) {
      // Handle any errors that occur during the query
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start Express Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
