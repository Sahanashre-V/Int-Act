const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  if (typeof roles === "string") roles = [roles];

  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Forbidden: Insufficient role" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
};

module.exports = auth;
