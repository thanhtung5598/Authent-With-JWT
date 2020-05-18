const router = require("express").Router();
const verify = require("./verifyToken");
const PostController = require("./../controllers/PostController");

router.get("/", verify.verifyToken, PostController.postNews);

module.exports = router;
