module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that.");
    return res.redirect("/login"); // ✅ Use return to stop further execution
  };


  module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
      delete req.session.redirectUrl; // optional: clean up after using
    }
    next();
  };
  module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return next(new ExpressError("Listing not found", 404));
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
const Review = require("./models/review.js");

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You are not authorized to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// If you're exporting other functions too:
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

  