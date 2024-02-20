// 20. Problem: Express Route with MongoDB Aggregation

// Problem Statement: Create an Express route that uses MongoDB aggregation to calculate and return the average age of all users in the database.

// Function Signature:

// /**
//  * Express route to calculate the average age of all users in MongoDB
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  */
// function averageAgeOfUsers(req, res) {
//   // Your implementation here
// }

// Expected Output:
// ->Return a JSON response with the calculated average age.

// Test Cases:
// 1.Access the route /average-age and check if the response contains the expected average age.

// solution:-

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost/Node30DayChallenge");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
}

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

async function averageAgeOfUsers(req, res) {
  try {
    // Use MongoDB aggregation to calculate the average age
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const averageAge = result[0].averageAge;
    res.json({ averageAge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Define the route
app.get("/average-age", averageAgeOfUsers);

// Asynchronously connect to MongoDB
connectToMongoDB()
  .then(() => {
    // Start Express Server after successful MongoDB connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Handle MongoDB connection error
    console.error(`Error connecting to MongoDB: ${error}`);
  });