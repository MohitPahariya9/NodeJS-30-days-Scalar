const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Function to connect to MongoDB asynchronously
async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost/Node30DayChallenge");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
}

// Express route to get all users from MongoDB
app.get("/users", async (req, res) => {
  try {
    // Use async/await syntax to retrieve all users from the database
    const users = await User.find({});
    // If the query is successful, send a JSON response with the array of user objects
    res.json(users);
  } catch (error) {
    // Handle any errors that occur during the query
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

// Asynchronously connect to MongoDB
connectToMongoDB()
  .then(() => {
    // Start Express Server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Test Case
    addUserWithValidation({ username: "john_doe", email: "invalid-email" });
    addUserWithValidation({
      username: "kayo_valorant",
      email: "kayo@valorant.com",
    });
  })
  .catch((error) => {
    // Handle MongoDB connection error
    console.error(`Error connecting to MongoDB: ${error}`);
  });
