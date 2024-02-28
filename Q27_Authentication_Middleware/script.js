// Problem 27: Authentication Middleware

// Problem Statement: You are developing a web application with Node.js and Express, and you need to implement an authentication middleware to protect certain routes. The authentication should be token-based and support user roles (e.g., admin, regular user). Design a middleware function that verifies the authenticity of incoming requests and checks if the user has the required role to access certain routes.

// Function Signature:

// function authenticateAndAuthorize(req, res, next) {
//     // Your implementation here
// }

// solution:-

const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "mohit619";
const app = express();
const port = 3000;

app.use(express.json());

// Sample user data (for demo purposes)
const user = [
  { id: 10, username: "admin", role: "admin" },
  { id: 20, username: "customer", role: "user" },
];

// Middleware for authentication and authorization
function authenticateAndAuthorize(req, res, next) {
  try {
    const tokenHeader = req.header("Authorization");

    if (typeof tokenHeader !== "undefined") {
      const bearer = tokenHeader.split(" ");
      const token = bearer[1];

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).send({ result: "Invalid token" });
        } else {
          req.user = decoded.user; // Attach decoded user information to req.user
          req.token = token;
          next();
        }
      });
    } else {
      res.status(401).send({
        result: "Token Is not Valid",
      });
    }
  } catch (error) {
    console.error("An error occurred in authenticationMiddleware:", error);
    res.status(500).send({
      result: "Internal Server Error",
    });
  }
}

app.post("/login", (req, res) => {
  jwt.sign({ user }, secretKey, { expiresIn: "3000s" }, (err, token) => {
    if (err) {
      console.error("Error in token generation:", err);
      return res.status(500).json({
        result: "Token Generation Failed",
      });
    }
    res.json({
      token,
    });
  });
});

// Protected route that requires authentication and admin role
app.get("/admin", authenticateAndAuthorize, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.status(401).send({ result: "invalid token" });
    } else {
      res.json({
        message: "profile accessed",
        authData,
      });
    }
  });
//   res.json({ message: "Welcome to the admin area" });
});

app.get("/user", (req, res) => {
  res.json({ message: "Welcome to the user area " });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
