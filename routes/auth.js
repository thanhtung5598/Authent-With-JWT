const router = require("express").Router();
const User = require("./../models/User");
const UserController = require("./../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
