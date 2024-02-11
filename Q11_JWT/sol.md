const jwt = require("jsonwebtoken");
const secretKey = "mohit619";

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Day 11 JWT in Express");
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    username: "abhi",
    email: "abhi@test.com",
  };
  jwt.sign({ user }, secretKey, { expiresIn: "3000s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

function authenticationMiddleware(req, res, next) {
  const tokenHeader = req.headers['authorization'];

  if (typeof tokenHeader !== "undefined") {
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(401).send({
      result: "Token Is not Valid",
    });
  }
}

app.post("/protected", authenticationMiddleware, (req, res) => {
    console.log("Received Token:", req.token); // Debugging line
    jwt.verify(req.token, secretKey, (err, authData) => {
      if (err) {
        console.error("Token Verification Error:", err); // Debugging line
        res.status(401).send({ result: "invalid token" });
      } else {
        console.log("Authentication Successful"); // Debugging line
        res.json({
          message: "profile accessed",
          authData,
        });
      }
    });
  });
  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
