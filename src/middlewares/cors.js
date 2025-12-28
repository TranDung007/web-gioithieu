const cors = require("cors");

module.exports = cors({
  origin: "http://localhost:5173", // hoặc "*" nếu test
  credentials: true,
});
