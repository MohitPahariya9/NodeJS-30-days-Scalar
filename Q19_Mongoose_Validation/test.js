// 19. Problem: Mongoose Validation

// Problem Statement: Enhance the user schema from the previous question to include validation for the "email" property (must be a valid email address). Implement a function to add a new user to the MongoDB database with validation.

// Function Signature:

// /**
//  * Adds a new user to the MongoDB database with validation
//  * @param {Object} user - User object with properties username and email
//  */
// function addUserWithValidation(user) {
//   // Your implementation here
// }
// Expected Output:

// If the user is successfully added, log a success message. If validation fails, log an error message.
// Test Cases:

// Call addUserWithValidation({ username: 'john_doe', email: 'invalid-email' }) and check the server logs for a validation error message.
// Hint:

// Define a Mongoose schema for the user with validation rules for the "email" property. Use the validate option to specify a custom validator function for the email format.

// Create a Mongoose model using the schema.

// Write a function addUserWithValidation that takes a user object, creates a new user instance using the Mongoose model, and attempts to save it to the database. Handle the validation errors and success cases appropriately.

// Hints:

// Use the mongoose.Schema constructor to define the schema with validation rules. Use the validate option to specify a custom validator function for the "email" property.
// Use the mongoose.model method to create a model from the schema.
// In the addUserWithValidation function, create a new user instance using the model constructor and the provided user object.
// Use the save method on the user instance to save it to the database. Use a callback function to handle the result of the save operation. If there is an error, log the error message. If the user is saved successfully, log a success message.

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

// Define Mongoose Schema and Model with email validation
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Invalid email address",
    },
  },
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


// Function to add a new user to the MongoDB database with validation
async function addUserWithValidation(user) {
    try {
      const newUser = new User(user);
      await newUser.save();
      console.log(`User ${user.username} added successfully!`);
    } catch (error) {
      console.error(`Error adding user: ${error.message}`);
    }
  }
  

// Test Case
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
addUserWithValidation({ username: 'kayo_valorant', email: 'kayo@valorant.com' });

// Start Express Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
