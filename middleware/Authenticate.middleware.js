const jwt = require("jsonwebtoken");

const Authenticate = (req, res, next) => {
 const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, "shivam", (err, decoded) => {
      if (decoded) {
        const userID = decoded.user_id;
        req.body.userID = userID;
        next()
      } else {
        res.send("plz login first");
      }
    });
  } else {
    res.send("login error");
  }
};

module.exports = { Authenticate };
