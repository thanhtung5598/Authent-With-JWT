const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET); // this verify is gonna throw us back is that ID
    req.user = verify; // ID of the user
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  next();
};
