const { Router } = require("express");
const { upload, getAll, deleteAll } = require("../controllers/upload");
const authenticateUser = require("../middlewares/authenticateUser");
const multer = require("multer");
const router = Router();
const uploadFile = require("../utils/uploadFile");

router.route("/").post(uploadFile.single("image"), upload);
router.route("/").get(getAll);
router.route("/").delete(deleteAll);

module.exports = router;
