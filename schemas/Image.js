const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    required: [true, "Fayl majburiy!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Image", imageSchema);
