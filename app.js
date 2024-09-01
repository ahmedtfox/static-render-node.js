const { text, buffer } = require("stream/consumers");

const { error } = require("console");

const express = require("express");
const app = express();
const path = require("path");

const db = require("./util/database");

/*
express-handlebars
const expressHBS = require("express-handlebars");

app.engine(
  "hbs",
  expressHBS({
    layouts: "./views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views"); */

// ejs
app.set("view engine", "ejs");
app.set("views", "views");

const admin = require("./routes/admin"); // order of importing doesn't matter
const shop = require("./routes/shop");
const bodyParser = require("body-parser");
/* 
 set pug as an engine template 
app.set("view engine", "pug");
app.set("views", "views");
 */
app.use(bodyParser.urlencoded());

const productsController = require("./controllers/error");

app.use(express.static(path.join(__dirname, "public"))); //76. Serving Files Statically
app.use(admin);
app.use(shop); // order of using the routes matter
// it doesn't matter because we use get
app.use(productsController.page404);

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
