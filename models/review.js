const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Review comment cannot be empty"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author:{
    type: mongoose.SchemaTypes.ObjectId,
    ref : "User"
  }

});

module.exports = mongoose.model("Review", reviewSchema);
