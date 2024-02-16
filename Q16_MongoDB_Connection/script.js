// 16. Problem: MongoDB Connection Setup

// Problem Statement: Create an Express application with MongoDB integration using Mongoose. Implement a function to establish a connection to a MongoDB database. Ensure that the connection is successful and log a success message.

// Function Signature:

// /**
//  * Establishes a connection to MongoDB using Mongoose
//  */
// function connectToMongoDB() {
//   // Your implementation here
// }
// Expected Output:

// If the connection is successful, log a success message.
// Test Cases:

// Call connectToMongoDB() and check the server logs for a successful connection message.
// Hint

// Setup Mongoose: Ensure Mongoose is installed in your project. If not, install it using npm (npm install mongoose).

// Connect to MongoDB: Use mongoose.connect() to connect to your MongoDB database. Replace 'mongodb://localhost/mydatabase' with your MongoDB connection string.

// Handle Connection Events: Use db.on('error', ...) to handle connection errors and db.once('open', ...) to log a success message when the connection is established.

// Testing: After defining the connectToMongoDB function, call it in your code to establish the MongoDB connection.

// Verify Connection: Check your server logs for the success message to ensure the connection was successful.

// Remember, understanding how Mongoose connects to MongoDB and how to handle connection events will be key to solving this problem.

// solution:-

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoURI = "mongodb://localhost/Node30DayChallenge";

function connectToMongoDB() {
  mongoose.connect(mongoURI);

  const db = mongoose.connection;
  db.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
  db.once("open", async () => {
    console.log("Connected to MongoDB successfully!");

    // Add data to the MongoDB collection
    const mydatabase = mongoose.model("mydatabase", {
      name: String,
      challenge: String,
    });

    // Create a new document
    const newDocument = new mydatabase({
      name: "Mohit",
      challenge: "30 day Node.js",
    });

    try {
      // Save the document to the database using promises
      const savedDocument = await newDocument.save();
      console.log(`Document saved successfully: ${savedDocument}`);
    } catch (error) {
      console.error(`Error saving document: ${error}`);
    } finally {
      // Close the MongoDB connection after saving the document
      mongoose.connection.close();
    }
  });
}

connectToMongoDB();

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
