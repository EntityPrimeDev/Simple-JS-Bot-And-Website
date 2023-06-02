const passport = require("passport")
const { Strategy } = require("passport-discord")
const { client } = require("../server")
passport.use(new Strategy({
    clientID: "1083899075675566140",
    clientSecret: 'v_cmJNGufymf3WaqJRlEMLxWXM3RYDNR',
    callbackURL: 'http://localhost:3000/api/v1/auth/redirect',
    scope: ["identify"]
  }, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);
    console.log(profile)
  })
)