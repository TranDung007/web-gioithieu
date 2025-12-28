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
INSERT INTO products
(name, alt, image, price_s, price_m, price_l, type, quantity, star, status)
VALUES
(
  'Caramel Latte',
  'caramel-latte',
  '/images/sp-1-caramel-latte.jpg',
  30000, 35000, 40000,
  'coffee', 1, 5, 'new'
),
(
  'Cà phê Mocha',
  'mocha-nong',
  '/images/sp-2-cafe-mocha-nong.jpg',
  45000, 50000, 55000,
  'coffee', 1, 4, 'new'
),
(
  'Espresso Macchiato',
  'espresso-macchiato',
  '/images/sp-3-epresso-macchiato.jpg',
  35000, 40000, 45000,
  'coffee', 1, 5, 'special'
),
(
  'Americano',
  'americano',
  '/images/sp-4-americano.jpg',
  40000, 45000, 50000,
  'coffee', 1, 4, 'special'
),
(
  'Mocha Socola',
  'mocha-socola',
  '/images/sp-5-mocha-socola.jpg',
  50000, 55000, 60000,
  'coffee', 1, 5, 'selling'
),
(
  'Mocha Caramel',
  'caramel-mocha',
  '/images/sp-6.jpg',
  50000, 55000, 60000,
  'coffee', 1, 4, 'new'
);
