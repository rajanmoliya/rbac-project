const checkRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        msg: "You are not allowed to access this route",
      });
    }
    next();
  };
};

module.exports = checkRole;
