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
const userSchema = require("../src/models/userModel");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const localStrategy = require("passport-local").Strategy;
const crypto = require('crypto');
const { STATUS_CODES } = require('http');

mongoose
.connect(
    "mongodb+srv://jmgallinal:abc12345678@cluster0.mcsyn.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => console.log(("Connected to DB")))
.catch((error) => console.log(error));

 /***********************************************************************************
     *                                  Middlewares
     **********************************************************************************/

  app.use(
    cors({
      origin: ["http://localhost:19006", "http://localhost:19000"],// <-- location of the react app were connecting to
      credentials: true,
    })
  );
  app.use(express.json());
    
  app.use("/api", userRoutes);
  app.use("/api", subjectRoutes);
  app.use("/api", claimRoutes);
  app.use("/api", gridRoutes);
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

app.use(session({
  secret: "secretcode",
    resave: true,
    saveUninitialized: true
}));



app.use(passport.initialize())
app.use(passport.session())

require("./passportConfig")(passport);



//END OF MIDDLEWARE

//Routes
app.post("/login", (req, res) => {
  console.log("No")
  userSchema.findOne({ mail: req.body.mail }, async (err, doc) => {
    if (doc) {
    bcrypt.compare(req.body.password, doc.password, (err, result) => {
    if (result === true) {
      res.send("Successfully Authenticated");
    } else {
      res.status(400);
      res.send(400);

    }});}})});
    
/*
app.post("/login", (req, res, next) => {
  console.log("body parsing", req.body);
  passport.authenticate("local", (err,userSchema,info) => {
    if(err) throw err;
    if (!userSchema) res.send("No existe");
    else{
      req.logIn(userSchema, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.userSchema);
      });
    }
  })(req, res, next);
});
*/
app.get("/userPrueba", (req, res) => {
  res.send("req"); // The req.user stores the entire user that has been authenticated inside of it.
});


app.post("/register", (req, res) => {
  userSchema.findOne({ mail: req.body.mail }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { firstName, lastName, mail, password, isStudent, subjects } = req.body;
      console.log(req.body)
      const newUser = new userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        mail: req.body.mail,
        isStudent: req.body.isStudent,
        subjects: req.body.subjects
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.listen(port, () => console.log("Server listening on port", port));