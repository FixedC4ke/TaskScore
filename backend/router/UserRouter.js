const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const passport = require("../config/passport");

router.post("/register", UserController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  UserController.login
);

module.exports = router;