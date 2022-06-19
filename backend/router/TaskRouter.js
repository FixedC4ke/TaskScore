const express = require("express");
const router = express.Router();
const TaskController = require("../controller/TaskController");
const passport = require("../config/passport");

router.use(passport.authenticate("jwt", { session: false }));

router.get("/list", TaskController.get);
router.post("/create", TaskController.create);
router.post("/score", TaskController.score);

module.exports = router;
