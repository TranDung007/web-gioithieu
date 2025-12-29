const db = require("../config/db");

exports.createOrder = (req, res) => {
    console.log("BODY CONTENT:", JSON.stringify(req.body));//Debug log cho dễ fix
  const {
    name,
    phone,
    address,
    pay_method,
    subtotal,
    discount,
    total,
    items
  } = req.body;

  if (!name || !phone || !address || !pay_method || !items || items.length === 0) {
    return res.status(400).json({
      message: "Thiếu thông tin đơn hàng"
    });
  }

  
  const customerSql = `
    INSERT INTO customers (full_name, phone, address)
    VALUES (?, ?, ?)
  `;

  db.query(customerSql, [name, phone, address], (err, customerResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi tạo khách hàng" });
    }

    const customerId = customerResult.insertId;

  
    const orderSql = `
      INSERT INTO orders
      (customer_id, total_price, discount, final_price, payment_method)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      orderSql,
      [customerId, subtotal, discount, total, pay_method],
      (err, orderResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Lỗi tạo đơn hàng" });
        }

        const orderId = orderResult.insertId;

      
        const itemSql = `
          INSERT INTO order_items
          (order_id, product_id, size, quantity, price)
          VALUES ?
        `;

        const itemValues = items.map(item => [
          orderId,
          item.product_id,
          item.size,
          item.quantity,
          item.price
        ]);

        db.query(itemSql, [itemValues], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "Lỗi lưu chi tiết đơn hàng"
            });
          }

          res.status(201).json({
            message: "Đặt hàng thành công",
            order_id: orderId
          });
        });
      }
    );
  });
};
