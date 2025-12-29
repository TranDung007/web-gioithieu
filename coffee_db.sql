-- =========================
-- CREATE DATABASE
-- =========================
CREATE DATABASE IF NOT EXISTS coffee_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE coffee_db;

-- =========================
-- TABLE: users
-- =========================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLE: products
-- =========================
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  alt VARCHAR(255),
  image VARCHAR(255),
  price_s INT,
  price_m INT,
  price_l INT,
  type VARCHAR(50),
  quantity INT DEFAULT 1,
  star INT DEFAULT 5,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- INSERT PRODUCTS
-- =========================
INSERT INTO products (id, name, alt, image, price_s, price_m, price_l, type, quantity, star, status) VALUES
(1, 'Caramel latte', 'caramel-latte', 'images/sp-1-caramel-latte.jpg', 30000, 35000, 40000, 'coffee', 1, 5, 'new'),
(2, 'Cà phê mocha', 'mocha-nong', 'images/sp-2-cafe-mocha-nong.jpg', 45000, 50000, 55000, 'coffee', 1, 4, 'new'),
(3, 'Macchiato', 'epresso-macchiato', 'images/sp-3-epresso-macchiato.jpg', 35000, 40000, 45000, 'coffee', 1, 5, 'special'),
(4, 'americano', 'americano', 'images/sp-4-americano.jpg', 40000, 45000, 50000, 'coffee', 1, 4, 'special'),
(5, 'mocha socola', 'mocha-socola', 'images/sp-5-mocha-socola.jpg', 50000, 55000, 60000, 'coffee', 1, 5, 'selling'),
(6, 'mocha caramel', 'caramel-Mocha', 'images/sp-6.jpg', 50000, 55000, 60000, 'coffee', 1, 4, 'new'),
(7, 'Capuchino', 'Capuchino', 'images/sp-7.jpg', 40000, 45000, 50000, 'coffee', 1, 5, 'new'),
(8, 'Trà Sen', 'tra-sen', 'images/sp-8-trasen.jpg', 30000, 35000, 40000, 'tea', 1, 4, 'new'),
(9, 'Trà vải', 'travai', 'images/sp-9-travai.jpg', 40000, 45000, 50000, 'tea', 1, 5, 'special'),
(10, 'mocha dừa', 'mocha-dua', 'images/sp-10-mocha-dua.jpg', 45000, 50000, 55000, 'coffee', 1, 4, 'special'),
(11, 'Trà Quất', 'tra-quat', 'images/sp-11.jpg', 50000, 55000, 60000, 'tea', 1, 4, 'special'),
(12, 'mocha latte', 'mocha-latte', 'images/sp-12-mocha-latte.jpg', 50000, 55000, 60000, 'coffee', 1, 5, 'special'),
(13, 'Bạc xỉu', 'bac-xiu', 'images/sp-13-bacxiu.jpg', 30000, 35000, 40000, 'coffee', 1, 4, 'selling'),
(14, 'Trà đào', 'tra-dao', 'images/sp-14-tradao.jpg', 30000, 35000, 40000, 'tea', 1, 4, 'selling'),
(15, 'Freeze Matcha', 'Freeze-Matcha', 'images/sp-15-freeze-matcha.png', 40000, 45000, 50000, 'freeze', 1, 5, 'new'),
(16, 'Freeze Việt Quất', 'Freeze-vietquat', 'images/sp-16-freeze-vietquat.jpg', 55000, 60000, 65000, 'freeze', 1, 5, 'new'),
(17, 'cà phê dừa', 'caphe-dua', 'images/sp-17-duada.jpg', 35000, 40000, 45000, 'coffee', 1, 5, 'new'),
(18, 'Freeze Socola', 'Freeze-Socola', 'images/sp-18-freeze-socola.jpg', 55000, 60000, 65000, 'freeze', 1, 5, 'new'),
(19, 'Cà phê đen', 'caphe-den', 'images/sp-19.jpg', 25000, 30000, 35000, 'coffee', 1, 4, 'selling'),
(20, 'Cà phê sữa', 'caphe-sưa', 'images/sp-20.jpg', 25000, 30000, 35000, 'coffee', 1, 4, 'selling'),
(21, 'Freeze kem', 'Freeze-kem', 'images/sp-21-freezekem.jpg', 40000, 45000, 50000, 'freeze', 1, 4, 'selling'),
(22, 'Trà chanh', 'tra-chanh', 'images/sp-22-trachanh.jpg', 25000, 30000, 35000, 'tea', 1, 4, 'selling'),
(23, 'Cà phê gói', 'tra-chanh', 'images/sp-23.jpg', 65000, 70000, 75000, 'coffee-box', 1, 4, 'selling'),
(24, 'Cà phê hòa tan', 'tra-chanh', 'images/sp-24.jpg', 80000, 85000, 90000, 'coffee-box', 1, 4, 'new'),
(25, 'Cà phê Roast', 'tra-chanh', 'images/sp-25.jpg', 95000, 100000, 105000, 'coffee-box', 1, 4, 'new');