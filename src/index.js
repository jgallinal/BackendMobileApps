const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const subjectRoutes = require("./routes/subject");
const claimRoutes = require("./routes/claim");
const gridRoutes = require("./routes/grid");
const bcrypt = require('bcrypt');
const passport = require('passport');
const app = express();
const session = require('express-session');
//const flash = require('express-flash');
const port = process.env.PORT || 9000;
const cookieParser = require('cookie-parser');
//const initializePassport = require('./passport-config');
const PassportLocal = require('passport-local').Strategy;
const User = require("../src/models/userModel");
const router = express.Router();


/*
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)*/

mongoose
.connect(
    "mongodb+srv://jmgallinal:abc12345678@cluster0.mcsyn.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => console.log(("Connected to DB")))
.catch((error) => console.log(error));


app.use(express.urlencoded({ extended: true }));
//app.use(flash());
app.use(session({
  secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));

require("./passportConfig")(passport);


app.use(passport.initialize())
app.use(passport.session())


//END OF MIDDLEWARE

//Routes
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", subjectRoutes);
app.use("/api", claimRoutes);
app.use("/api", gridRoutes);


app.post("/login", (req, res, next) => {
  console.log("Entro")
  passport.authenticate("local", (err, userSchema, info) => {
    if (err) throw err;
    console.log(err);
    if (!userSchema) res.send("No User Exists");
    else {
      req.logIn(userSchema, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.userSchema);
      });
    }
  })(req, res);
});

app.get("/userPrueba", (req, res) => {
  res.send(req.userSchema); // The req.user stores the entire user that has been authenticated inside of it.
});
/*
app.get('/', checkAuthenticated, (req, res) => {
  res.send("Logrado");
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.send("No entro");
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }*/

app.listen(port, () => console.log("Server listening on port", port));