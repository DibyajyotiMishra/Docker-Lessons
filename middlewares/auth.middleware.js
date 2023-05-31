function checkAuth(req, res, next) {
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({
      status: "fail",
      error: "Unauthorized.",
    });
  }
  req.user = user;
  next();
}

module.exports = checkAuth;
