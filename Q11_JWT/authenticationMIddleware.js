const jwt = require("jsonwebtoken");
const secretKey = "mohit619";
/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */


function authenticationMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {  // No token provided, return 401 Unauthorized
    console.log('No token provided');
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded payload to the request
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid, return 401 Unauthorized
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = authenticationMiddleware;