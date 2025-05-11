// Load environment variables in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/usermodel.js");
const listingRoutes = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");
const userRoutes = require("./routes/user.js");

const app = express();

// ✅ Define dbUrl before use
const dbUrl = process.env.ATLASDB_URL 

// ✅ Setup MongoStore for session
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log("ERROR in MONGO session Store", err);
});

// ✅ Session configuration
const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// ✅ MongoDB connection
async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error:", err));

// ✅ App configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOption));
app.use(flash());

// ✅ Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Global middleware for flash + currentUser
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// ✅ Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRoutes);

// ✅ Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// ✅ Server start
app.listen(8080, () => {
  console.log("Server is working on port 8080");
});
