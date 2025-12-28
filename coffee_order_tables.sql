-- =========================
-- BẢNG KHÁCH HÀNG
-- =========================
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- BẢNG ĐƠN HÀNG
-- =========================
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,

  customer_id INT NOT NULL,
  user_id INT NULL, -- nếu khách đã đăng nhập
  total_price INT NOT NULL,
  discount INT DEFAULT 0,
  final_price INT NOT NULL,

  payment_method ENUM('cash', 'bank') NOT NULL,
  status ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled')
         DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE SET NULL
);

-- =========================
-- BẢNG CHI TIẾT ĐƠN HÀNG
-- =========================
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,

  order_id INT NOT NULL,
  product_id INT NOT NULL,

  size ENUM('S', 'M', 'L') NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price INT NOT NULL, -- giá tại thời điểm mua

  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE
);
