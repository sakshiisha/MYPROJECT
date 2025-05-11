const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");
const Listing = require("../models/listing.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email }); 
    const registeredUser = await User.register(newUser, password); 
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "User was registered successfully!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
  });

  router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      req.flash("success", "Welcome back!");
      const redirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
    }
  );
  

  router.post("/logout", (req,res,next)=>{
    req.logOut((err)=>{
      if(err){
      return next(err)
      }
      req.flash("success", "You Are logged out!");
      res.redirect("/listings")
    })
  })

module.exports = router;
