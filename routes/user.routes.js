const { Router } = require("express");
const { getMe } = require("../controllers/user");
const router = Router();
const authenticateUser = require("../middlewares/authenticateUser");

router.route("/me").get(authenticateUser, getMe);

module.exports = router;
