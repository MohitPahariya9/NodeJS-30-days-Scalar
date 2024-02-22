// 22. Problem: MongoDB CRUD Operations

// Problem Statement: Implement a set of CRUD (Create, Read, Update, Delete) operations for a "Product" entity using MongoDB and Mongoose. Define a Mongoose schema for the product with properties like "name," "price," and "quantity." Implement functions to create, read, update, and delete products.

// Function Signature:

// /**
//  * Creates a new product in MongoDB
//  * @param {Object} product - Product object with properties name, price, and quantity
//  */
// function createProduct(product) {
//   // Your implementation here
// }

// /**
//  * Retrieves all products from MongoDB
//  * @returns {Array} - Array of product objects
//  */
// function getAllProducts() {
//   // Your implementation here
// }

// /**
//  * Updates a product in MongoDB
//  * @param {string} productId - ID of the product to update
//  * @param {Object} updatedProduct - Updated product object
//  */
// function updateProduct(productId, updatedProduct) {
//   // Your implementation here
// }

// /**
//  * Deletes a product from MongoDB
//  * @param {string} productId - ID of the product to delete
//  */
// function deleteProduct(productId) {
//   // Your implementation here
// }
// Expected Output:

// The functions should perform the respective CRUD operations on the "Product" collection in MongoDB.
// Test Cases:

// Create a product, retrieve all products, update a product, and then delete the product.
// hint: To solve this problem, you can follow these steps:

// Define a Mongoose schema for the "Product" entity with properties like "name," "price," and "quantity."
// Create a Mongoose model using the schema.
// Implement the createProduct function to create a new product in MongoDB.
// Implement the getAllProducts function to retrieve all products from MongoDB.
// Implement the updateProduct function to update a product in MongoDB.
// Implement the deleteProduct function to delete a product from MongoDB.
// You can use Mongoose methods like save, find, findByIdAndUpdate, and findByIdAndDelete to perform the CRUD operations.

// solution:-

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CRUD');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the Product schema
const productSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Create a Mongoose model for the Product
const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

// Dummy data with id
const dummyProducts = [
    { name: 'Product 1', price: 10.99, quantity: 50 },
    { name: 'Product 2', price: 20.99, quantity: 30 },
    { name: 'Product 3', price: 15.99, quantity: 25 },
];

// Insert dummy data
async function insertDummyData() {
    try {
        const productsWithIds = dummyProducts.map(product => ({
            ...product,
            id: new mongoose.Types.ObjectId(),
        }));

        await Product.insertMany(productsWithIds);
        console.log('Dummy data inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy data:', error.message);
    }
}

// Create a new product
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product (name, price, and quantity)
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: req.body },
            { new: true }
        );
        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product based on ID
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server and insert dummy data
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    insertDummyData();
});


