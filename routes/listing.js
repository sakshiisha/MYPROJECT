const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const catchAsync = require("../utils/catchAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

const multer = require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const upload = multer({ storage });

// ✅ Index Route - Show all listings
router.get(
  "/",
  catchAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// ✅ New Form Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// ✅ Create Listing Route (Image Upload + Save to DB)
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  catchAsync(async (req, res) => {
    try {
      if (!req.file) {
        req.flash("error", "No image uploaded!");
        return res.redirect("/listings/new");
      }

      const { path: url, filename } = req.file;

      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = { url, filename };

      await newListing.save();

      req.flash("success", "New Listing Created!");
      res.redirect("/listings");
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong while creating listing.");
      res.redirect("/listings/new");
    }
  })
);

// ✅ Show Individual Listing
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if (!listing) throw new ExpressError("Listing not found", 404);
    res.render("listings/show.ejs", { listing });
  })
);

// ✅ Edit Form Route
router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    let originalImageUrl = listing.image?.url || "";
    if (originalImageUrl) {
      originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    }

    res.render("listings/edit.ejs", { listing, originalImageUrl });
  })
);

// ✅ Update Route (with image update support)
router.put(
  "/:id",
  isLoggedIn,
  upload.single("listing[image]"),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) throw new ExpressError("Listing not found", 404);

    // ✅ Update fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.address;
    listing.country = req.body.listing.country;

    // ✅ If new image is uploaded, replace the old one
    if (req.file) {
      if (listing.image && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename); // delete old image from Cloudinary
      }

      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

// ✅ Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) throw new ExpressError("Listing not found", 404);

    // ✅ Delete image from Cloudinary if it exists
    if (deletedListing.image && deletedListing.image.filename) {
      await cloudinary.uploader.destroy(deletedListing.image.filename);
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  })
);

module.exports = router;
