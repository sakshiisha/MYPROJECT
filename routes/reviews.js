const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");



router.post("/", isLoggedIn, async (req, res) => {
    try {
      let listing = await Listing.findById(req.params.id);
  
      if (!listing) {
        return res.status(404).send("Listing not found");
      }
  
      let newReview = new Review(req.body.review);
      newReview.author = req.user._id;
      
      
      listing.reviews.push(newReview);
  
      
      await newReview.save();
      await listing.save();
  
      console.log("New review saved");
      req.flash("success", "New Review Created!")
      res.redirect(`/listings/${listing._id}`); 
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Delete Reviews Route
  router.delete("/:reviewId", async(req,res)=>{
    let {id, reviewId} = req.params;
  
    await Listing.findByIdAndUpdate(id ,{$pull: {reviews: reviewId}})
     await Review.findById(reviewId);
     req.flash("success", "Review Deleted!")
     res.redirect(`/listings/${id}`)
  });

  module.exports = router;
  