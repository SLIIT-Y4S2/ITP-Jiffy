const { rateLimit } = require("express-rate-limit");

const normalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 3, // Limit each IP to 3 requests per `window` (here, per 5 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: function (req, res) {
    const errorMessage = `Too many attempts, please try again later after ${
      this.windowMs / (1000 * 60)
    } minutes`;

    res.status(429).json({
      error: errorMessage,
    });
  },
});

const googleRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 3, // Limit each IP to 3 requests per `window` (here, per 5 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: function (req, res) {
    const errorMessage = `Too many attempts, please try again later after ${
      this.windowMs / (1000 * 60)
    } minutes`;

    res.cookie("rateLimit", errorMessage, {
      maxAge: this.windowMs,
    });
    res.redirect("https://localhost:3000/request-denied");
  },
});

module.exports = { normalRateLimiter, googleRateLimiter };
