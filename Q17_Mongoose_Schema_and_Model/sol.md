const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Implement addUserToDatabase function
async function addUserToDatabase(user) {
  try {
    // Create a new User object
    const newUser = new User({
      username: user.username,
      email: user.email
    });

    // Save the user to the database
    await newUser.save();

    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user to the database:', error.message);
  }
}

// Test the function
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });

// Disconnect from MongoDB when done
db.on("close", () => {
  console.log("Disconnected from MongoDB");
});
