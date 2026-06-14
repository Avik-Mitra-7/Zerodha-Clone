const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
    if (err) {
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(decodedToken.id);
        if (user) {
          return res.json({ status: true, user: user.username });
        } else {
          return res.json({ status: false });
        }
      } catch (dbError) {
        return res.json({ status: false });
      }
    }
  });
};