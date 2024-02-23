// 23. Problem: Mongoose Population

// Problem Statement: Extend the previous "Product" schema to include a reference to a "Category" entity. Implement a Mongoose population query to retrieve all products with their corresponding category details.

// Function Signature:

// /**
//  * Retrieves all products with populated category details from MongoDB
//  * @returns {Array} - Array of product objects with populated category details
//  */
// function getProductsPopulatedWithCategory() {
//   // Your implementation here
// }
// Expected Output:
// The function should return an array of product objects with populated category details.

// Test Cases:
// -->Create products with associated categories, then call the function to retrieve products with populated category details.

// Hint:
// To solve this problem, you'll need to:

// Define a Category schema.
// Update the Product schema to include a reference to Category.
// Create a ProductWithCategory model using the updated schema.
// Implement the getProductsPopulatedWithCategory function using Mongoose's populate method to retrieve all products with their corresponding category details.
// Hint: Use Mongoose's populate method on the category field of the ProductWithCategory model to populate the category details.

// solution:-

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CRUD2');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the Category schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

// Create a Mongoose model for the Category
const Category = mongoose.model('Category', categorySchema);

// Define the updated Product schema with a reference to Category
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category
});

// Create a Mongoose model for the updated Product schema
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

app.use(bodyParser.json());

// Dummy data with categories
const dummyCategories = [
    { name: 'Category A' },
    { name: 'Category B' },
];

const dummyProductsWithCategories = [
    { name: 'Product 1', price: 10.99, quantity: 50 },
    { name: 'Product 2', price: 20.99, quantity: 30 },
    { name: 'Product 3', price: 15.99, quantity: 25 },
];

// Insert dummy categories
async function insertDummyCategories() {
    try {
        await Category.insertMany(dummyCategories);
        console.log('Dummy categories inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy categories:', error.message);
    }
}

// Insert dummy data with associated categories
async function insertDummyDataWithCategories() {
    try {
        // Fetch existing categories or insert them if not present
        const categories = await Category.find();

        // If no categories exist, insert dummy categories
        if (categories.length === 0) {
            await insertDummyCategories();
        }

        // Fetch categories again after insertion
        const updatedCategories = await Category.find();

        // Associate products with categories
        const productsWithCategories = dummyProductsWithCategories.map((product, index) => ({
            ...product,
            category: updatedCategories[index]._id,
        }));

        await ProductWithCategory.insertMany(productsWithCategories);
        console.log('Dummy data with associated categories inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy data with categories:', error.message);
    }
}

// Create a new product with category
app.post('/products', async (req, res) => {
    try {
        const product = await ProductWithCategory.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve all products with populated category details
async function getProductsPopulatedWithCategory() {
    try {
        const products = await ProductWithCategory.find().populate('category');
        return products;
    } catch (error) {
        throw new Error(`Error retrieving products with category details: ${error.message}`);
    }
}

// Endpoint to retrieve products with populated category details
app.get('/productsWithCategory', async (req, res) => {
    try {
        const productsWithCategory = await getProductsPopulatedWithCategory();
        res.json(productsWithCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server and insert dummy data with categories
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    insertDummyCategories();
    insertDummyDataWithCategories();
});