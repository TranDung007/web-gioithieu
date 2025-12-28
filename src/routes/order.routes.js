// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/order.controller");

// // POST /api/orders
// router.post("/", orderController.createOrder);

// module.exports = router;
// routes/order.routes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/", (req, res, next) => {
  console.log("==> ĐÃ NHẬN REQUEST TẠI ROUTER ORDER <==");
  console.log("Headers:", req.headers['content-type']);
  next(); // Chuyển sang Controller
}, orderController.createOrder);

module.exports = router;