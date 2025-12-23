const jwt = require("jsonwebtoken");

// middleware to verify JWT token
const verifyToken = (req, res, next) => {
  console.log(req.cookies);

  const accessToken = req.cookies.access_token;

  // check if header exists and starts with 'Bearer'
  if (!accessToken) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    // verify token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // Attach user info to request for downstream use
    req.user = decoded;
    console.log("decoded:", decoded);
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
