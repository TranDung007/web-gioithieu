// auth.controller.js
const db = require("../config/db");

exports.login = (req, res) => {

  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi server" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const user = result[0];


    if (user.password !== password) {
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    return res.json({
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        signupEmail: user.email,
        name: user.full_name,
        phone: user.phone,
        address: user.address,
      },
    });
  });
};


exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
  }

 
  db.query("SELECT id FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi server" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }


    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Lỗi khi đăng ký" });
        }

        return res.json({ message: "Đăng ký thành công" });
      }
    );
  });
};
