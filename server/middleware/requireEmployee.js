const Employee = require("../models/Employee");

async function requireEmployee(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await Employee.findById(req.user._id);
  if (!user) {
    return res.status(403).json({ message: "Access denied. Employees only." });
  }
  next();
}

module.exports = requireEmployee;
