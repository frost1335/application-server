const { Router } = require("express");
const authenticateUser = require("../middlewares/authenticateUser");
const {
  getAll,
  getOne,
  create,
  editOne,
  deleteOne,
} = require("../controllers/campaign");
const router = Router();

router.route("/").get(authenticateUser, getAll).post(authenticateUser, create);
router
  .route("/:id")
  .get(authenticateUser, getOne)
  .patch(authenticateUser, editOne)
  .delete(authenticateUser, deleteOne);

module.exports = router;
