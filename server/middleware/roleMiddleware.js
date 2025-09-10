const { protect } = require("./authMiddleware")

const roleCheck = (roles) => {
  return [
    protect, 
    (req, res, next) => {
      
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }
      next();
    }
  ];
};

module.exports = { roleCheck };
