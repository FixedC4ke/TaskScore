const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const knex = require("./db");
require("dotenv").config();
const { JWT_SECRET } = process.env;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user = await knex.table("users").where("username", username).first();
    if (!user) {
      return done(null, false);
    }
    let result = await bcrypt.compare(password, user.passhash);
    if (!result) {
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      let user = await knex.table("users").where("id", payload.id).first();
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
