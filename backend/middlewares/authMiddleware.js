const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = authMiddleware;
