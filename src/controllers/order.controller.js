const db = require("../config/db");

/**
 * CREATE ORDER
 * POST /api/orders
 */
exports.createOrder = (req, res) => {
    console.log("REQ BODY:", req.body);
    console.log("TYPE OF BODY:", typeof req.body);
    console.log("BODY CONTENT:", JSON.stringify(req.body));
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
const errors = [];
  if (!name) errors.push("name");
  if (!phone) errors.push("phone");
  if (!address) errors.push("address");
  if (!pay_method) errors.push("pay_method");
  if (!items || items.length === 0) errors.push("items");
  // Validate
  if (!name || !phone || !address || !pay_method || !items || items.length === 0) {
    return res.status(400).json({
      message: "Thiếu thông tin đơn hàng"
    });
  }

  // 1️⃣ TẠO CUSTOMER
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

    // 2️⃣ TẠO ORDER
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

        // 3️⃣ TẠO ORDER ITEMS
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
