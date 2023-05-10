const express = require("express");
const { registerUser,authUser,allUsers } = require('../controller/userController');
const router = express.Router();

router.route("/").post(registerUser).get(allUsers);
router.route("/login").post(authUser);

module.exports = router;