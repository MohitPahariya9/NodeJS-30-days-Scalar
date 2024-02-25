async function createProductNameIndex() {
  try {
    // Access the MongoDB client from the Mongoose connection
    const dbClient = mongoose.connection.getClient();

    // Specify the collection on which to create the index (in this case, "products")
    const collection = dbClient.db().collection('products');

    // Create an index on the "name" field
    const indexResult = await collection.createIndex({ name: 1 });

    // Log the index creation result
    console.log('Index created:', indexResult);
  } catch (error) {
    console.error('Error creating index:', error.message);
  }
}