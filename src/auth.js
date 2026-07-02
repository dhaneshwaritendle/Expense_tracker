import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
const ALGORITHM = "HS256";

// It's critical that a secret is provided in a production environment.
// Throw an error at startup if it's missing.
if (!SECRET_KEY) {
  throw new Error("FATAL_ERROR: JWT_SECRET environment variable is not set.");
}

// Function to generate a JWT token
export function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    // It's good practice to include the issuer
    iss: "expense-tracker",
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h", algorithm: ALGORITHM });
}

// Middleware to verify JWT token on protected routes
export function authenticateToken(req, res, next) {
  // Read the token from the http-only cookie
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] }, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
}
