const asyncHandler = require("../middlewares/asyncHandler");

exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: {
      name: req.user.name,
      phone: req.user.phone,
    },
  });
});
