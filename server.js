const app = require("./src/app"); // File app.js đã có đầy đủ middleware rồi
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// XÓA BỎ các dòng app.use(express...) ở đây
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});