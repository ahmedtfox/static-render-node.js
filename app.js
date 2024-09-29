const express = require("express");
const app = express();
const path = require("path");

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

// Data Base
const mongoose = require("mongoose");
const mongodb_URL =
  "mongodb+srv://ahmedmongo:rD=,98Hf^4umZQ}&>@cluster0.arm5u.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

const User = require("./models/user.js");

const admin = require("./routes/admin"); // order of importing doesn't matter

// session
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({ uri: mongodb_URL, collection: "sessions" });

const auth = require("./routes/auth.js");
const shop = require("./routes/shop");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());

const errorPage = require("./controllers/error");
const ObjectId = require("mongodb").ObjectId;

app.use(express.static(path.join(__dirname, "public"))); //76. Serving Files Statically

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(admin);
app.use(shop);
app.use(auth);
// order of using the routes matter

// it doesn't matter because we use get

app.use(errorPage.get404);

mongoose
  .connect(mongodb_URL)
  .then((result) => {
    // user.save();
    //console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

/* 

rD=,98Hf^4umZQ}&>


mongodb+srv://ahmedmongo:rD=,98Hf^4umZQ}&>@cluster0.arm5u.mongodb.net/

*/
