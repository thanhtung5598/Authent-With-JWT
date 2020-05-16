const router = require("express").Router();
const User = require("./../models/User");
const UserController = require("./../controllers/UserController");

router.post("/register", UserController.register);

module.exports = router;
