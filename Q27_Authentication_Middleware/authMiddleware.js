const jwt = require('jsonwebtoken');
const secretKey = "mohit619";

function authenticateAndAuthorize(req, res, next) {
    try {
      const tokenHeader = req.header('Authorization');
  
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
    } catch (error) {
      console.error("An error occurred in authenticationMiddleware:", error);
      res.status(500).send({
        result: "Internal Server Error",
      });
    }
  }

module.exports = authenticateAndAuthorize;
