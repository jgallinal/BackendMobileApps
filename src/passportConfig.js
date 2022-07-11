const userSchema = require("../src/models/userModel");
var crypto = require('crypto');
const localStrategy = require("passport-local").Strategy;
var passport = require('passport');

module.exports = function (passport) {
  console.log("Entro");
    passport.use(
        new localStrategy(function verify (mail, password, done) {
            userSchema.findOne({ mail: mail }, (err, userSchema) => {
            if (err) throw err;
            if (!userSchema) return done(null, false);
            crypto.compare(password, userSchema.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, userSchema);
            } else {
                return done(null, false);
            }
            });
        });
        })
  );

  passport.serializeUser((userSchema, cb) => {
    cb(null, userSchema.id);
  });
  passport.deserializeUser((id, cb) => {
    userSchema.findOne({ id: id }, (err, userSchema) => {
      const userInformation = {
        mail: userSchema.mail,
      };
      cb(err, userInformation);
    });
  });
};