const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const subjectRoutes = require("./routes/subject");
const claimRoutes = require("./routes/claim");
const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", subjectRoutes);
app.use("/api", claimRoutes);

mongoose
.connect(
    "mongodb+srv://jmgallinal:abc12345678@cluster0.mcsyn.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => console.log(("Connected to DB")))
.catch((error) => console.log(error));

app.listen(port, () => console.log("Server listening on port", port));