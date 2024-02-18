MongooseError: Model.find() no longer accepts a callback please modify the functions that use a callback by switching to the Promise or async/await syntax.

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