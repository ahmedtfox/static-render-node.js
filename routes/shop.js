const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded());

const adminData = require("./admin");

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
