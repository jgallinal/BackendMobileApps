const User = require("../src/models/userModel");
const bcrypt = require('bcrypt');
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    console.log("Hola");
    passport.use(
        new localStrategy((username, password, done) => {
            console.log(username);
            User.findOne({ mail: username }, (err, userSchema) => {
            if (err) throw err;
            if (!userSchema) return done(null, false);
            bcrypt.compare(password, userSchema.password, (err, result) => {
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
    User.findOne({ _id: id }, (err, userSchema) => {
      const userInformation = {
        username: userSchema.username,
      };
      cb(err, userInformation);
    });
  });
};