const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coffee_db",
});

db.connect((err) => {
  if (err) {
    console.error(" Kết nối MySQL thất bại:", err);
    return;
  }
  console.log(" Kết nối MySQL thành công");
});

module.exports = db;
