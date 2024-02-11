// Problem Statement: Implement an authentication middleware for an Express application. The middleware should check for the presence of a valid JWT (JSON Web Token) in the request headers. If a valid token is present, allow the request to proceed; otherwise, return a 401 Unauthorized status.

// Function Signature:

// /**
//  * Authentication middleware for Express
//  * @param {Object} req - Express request object
//  * @param {Object} res - Express response object
//  * @param {Function} next - Express next function
//  */
// function authenticationMiddleware(req, res, next) {
//   // Your implementation here
// }

// Expected Output:
// If a valid JWT is present, allow the request to proceed.
// If no JWT is present or it's invalid, return a 401 Unauthorized status.

// Test Cases:
// 1. Request with a valid JWT should proceed.
// 2. Request without a JWT or with an invalid JWT should return a 401 Unauthorized status.

// solution:-

const express = require('express');
const app = express();
const authenticationMiddleware = require('./authenticationMIddleware');

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Day 11 JWT in Express');
})

app.get('/protected',authenticationMiddleware,(req,res)=>{
  res.json({message : 'this is protected route', user:req.user});
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
