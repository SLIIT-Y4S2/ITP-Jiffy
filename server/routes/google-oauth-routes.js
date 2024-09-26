const passport = require("passport");
const express = require('express');
const { loginUser } = require("../controllers/userController");
const { googleRateLimiter } = require("../rate-limiter");

const router = express.Router()

router.get(
    "/google",
    googleRateLimiter,
    passport.authenticate("google", {
      // To authenticate using google to get the code
      scope: ["profile", "email"],
    })
  );

  // Callback route for google to redirect to
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "https://localhost:3000/login-redirect" }), // To fetch data using the code
  loginUser
);

module.exports = router