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