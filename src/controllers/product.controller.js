const db = require("../config/db");

const getAllProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi lấy sản phẩm" });
    }


    const products = results.map((item) => ({
      id: item.id,
      name: item.name,
      alt: item.alt,
      image: item.image,
      price: {
        S: item.price_s,
        M: item.price_m,
        L: item.price_l,
      },
      type: item.type,
      quantity: item.quantity,
      star: item.star,
      status: item.status,
    }));

    res.status(200).json(products);
  });
};

module.exports = {
  getAllProducts,
};
