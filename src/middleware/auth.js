const jwt = require("jsonwebtoken");

/******************** MIDDLEWARE ********************/

/* Verify token in each route request */
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    res.status(403).send({ error: "Please authenticate" });
    return;
  }
  const bearerToken = bearerHeader.split(" ")[1];
  jwt.verify(bearerToken, process.env.SECRET_KEY, function (err, user) {
    if (err) {
      res.status(401).send({
        error: "Invalid token",
      });
    } else {
      req.token = bearerToken;
      next();
    }
  });
};

module.exports = verifyToken;
