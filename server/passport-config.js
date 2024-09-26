require("dotenv").config();

const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const { createGoogleUser, getGoogleUserById } = require("./controllers/userController");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (cookieUser, done) => {
  try {
    const user = await getGoogleUserById(cookieUser._id);
    done(null, user);
  } catch (error) {
    console.error(error.message);
    done(error, null);
  }
});

const googleStrategy = new Strategy(
  {
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/auth/google/redirect",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await createGoogleUser({
            name: profile.name.givenName,
            email: profile.emails[0].value,
            password: profile.id
        })
      done(null, user);
    } catch (error) {
      console.error(error.message);
      done(error, false);
    }
  }
);

passport.use(googleStrategy);
