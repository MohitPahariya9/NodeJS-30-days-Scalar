const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY || "defaultSecretKey";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Sample user data (for demo purposes)
const users = [
  { id: 10, username: "admin", role: "admin", password: "adminPassword" },
  { id: 20, username: "customer", role: "user", password: "customerPassword" },
];

// Middleware for authentication and authorization
function authenticateAndAuthorize(req, res, next) {
  try {
    const tokenHeader = req.header('Authorization');

    if (typeof tokenHeader !== "undefined") {
      const bearer = tokenHeader.split(" ");
      const token = bearer[1];

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).send({ result: "Invalid token" });
        } else {
          req.user = users.find(user => user.id === decoded.user.id); // Retrieve user details from a secure source
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
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user: { id: user.id, username: user.username, role: user.role } }, secretKey, { expiresIn: "3000s" });
    res.json({ token });
  } else {
    res.status(401).json({ result: "Invalid credentials" });
  }
});

// Protected route that requires authentication and admin role
app.get("/admin", authenticateAndAuthorize, (req, res) => {
  res.json({ message: "Welcome to the admin area", user: req.user });
});

app.get("/user", (req, res) => {
  res.json({ message: "Welcome to the user area", user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
