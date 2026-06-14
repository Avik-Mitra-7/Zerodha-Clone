const { Signup, Login } = require("../Controllers/AuthController"); 
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login); // This line was causing the error
router.post("/", userVerification);

module.exports = router;