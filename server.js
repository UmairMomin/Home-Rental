let express = require('express');
let port = 3000;
let app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + "/public"));

// Routes
const index = require("./routes/indexRoute");
const login = require("./routes/loginRoute");
const signup = require("./routes/signupRoute");
const dashbaord = require("./routes/dashboardRoute");


app.use("/", index);
app.use("/login", login);
app.use("/signup", signup);
app.use("/dashboard", dashbaord)

// Mongodb database connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://umairMomin:Diamond%402022@cluster0.iebums1.mongodb.net/HomeRental", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log(`server started on ${port}`);
});