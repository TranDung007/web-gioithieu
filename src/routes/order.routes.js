const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/", (req, res, next) => {
  next(); 
}, orderController.createOrder);

module.exports = router;