CREATE TYPE user_role AS ENUM ('admin', 'store', 'user');
-- Bảng user
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE,
    account VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    user_image TEXT,
    role user_role NOT NULL,
    user_create TIMESTAMP,
    password VARCHAR(100) NOT NULL
);

-- Bảng food_store
CREATE TABLE "food_store" (
    store_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "users"(user_id),
    store_name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    store_information JSON,
    store_image TEXT
);
-- Bảng category
CREATE TABLE "category" (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR NOT NULL,
    category_create DATE
);

-- Bảng product
CREATE TABLE "product" (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    store_id INT REFERENCES "food_store"(store_id),
    category_id INT REFERENCES "category"(category_id),
    product_image TEXT,
    product_create DATE,
    product_price INT,
    product_rate INT,
    product_quantity INT,
    product_description TEXT
);
-- Bảng order
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "users"(user_id),
    order_create TIMESTAMP
);
-- Bảng shipping
CREATE TABLE "shipping" (
    ship_id SERIAL PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    address VARCHAR,
    ship_create TIMESTAMP
);
ALTER TABLE shipping
ADD COLUMN order_id INT,
ADD CONSTRAINT fk_order_shipping FOREIGN KEY (order_id) REFERENCES "order"(order_id);
-- Bảng order_product (liên kết giữa order và product)
CREATE TABLE "order_product" (
    order_id INT REFERENCES "order"(order_id),
    product_id INT REFERENCES "product"(product_id),
    order_price INT,
    order_quantity INT,
    PRIMARY KEY (order_id, product_id)
);
-- Thêm dữ liệu cho bảng users
INSERT INTO users (email, phone, account, full_name, address, user_image, role, user_create, password) VALUES
('thanh@gmail.com', '0123456789', 'levanthanh', 'LE VAN THANH', 'Đà Lạt, Đức Trọng, Lâm Đồng', 'http://surl.li/cpxhts', 'admin', CURRENT_TIMESTAMP, 'thanh'),
('tranthib@gmail.com', '0911222333', 'tranthib', 'Trần Thị B', '456 Đường Hai Bà Trưng, Quận 3, TP. HCM', NULL, 'store', CURRENT_TIMESTAMP, 'password456'),
('lequangc@gmail.com', '0911999888', 'lequangc', 'Lê Quang C', '789 Đường Nguyễn Huệ, Quận 1, TP. HCM', NULL, 'user', CURRENT_TIMESTAMP, 'password789'),
('phamthud@gmail.com', '0905666777', 'phamthud', 'Phạm Thu D', '101 Đường Trần Hưng Đạo, Quận 5, TP. HCM', NULL, 'store', CURRENT_TIMESTAMP, 'passwordabc'),
('hoangvane@gmail.com', '0904333222', 'hoangvane', 'Hoàng Văn E', '202 Đường Cách Mạng Tháng 8, Quận 10, TP. HCM', NULL, 'user', CURRENT_TIMESTAMP, 'passworddef');

-- Thêm dữ liệu cho bảng food_store
INSERT INTO food_store (user_id, store_name, address, store_information, store_image) VALUES
(2, 'Quán Phở Hà Nội', '50 Đường Lý Tự Trọng, Quận 1, TP. HCM', '{"store_description": "Chuyên món phở bò Hà Nội.", "store_title": "Quán Phở Truyền Thống", "store_open": "6:00 - 22:00"}', NULL),
(4, 'Bún Chả Hương Liên', '75 Đường Lê Thánh Tôn, Quận 1, TP. HCM', '{"store_description": "Bún chả ngon, phục vụ nhanh chóng.", "store_title": "Bún Chả Nổi Tiếng", "store_open": "9:00 - 20:00"}', NULL),
(2, 'Cơm Tấm Ba Ghiền', '20 Đường Võ Văn Tần, Quận 3, TP. HCM', '{"store_description": "Cơm tấm Sài Gòn chuẩn vị.", "store_title": "Quán Cơm Tấm Ngon", "store_open": "10:00 - 21:00"}', NULL),
(4, 'Bánh Mì Huỳnh Hoa', '30 Đường Nguyễn Trãi, Quận 5, TP. HCM', '{"store_description": "Bánh mì thịt nguội, pate ngon nhất Sài Gòn.", "store_title": "Bánh Mì Huỳnh Hoa Nổi Tiếng", "store_open": "7:00 - 21:00"}', NULL),
(2, 'Gỏi Cuốn Sài Gòn', '15 Đường Trần Quang Khải, Quận 1, TP. HCM', '{"store_description": "Gỏi cuốn tôm thịt đặc biệt.", "store_title": "Quán Gỏi Cuốn Sài Gòn", "store_open": "8:00 - 22:00"}', NULL);
-- Thêm dữ liệu cho bảng category
INSERT INTO category (category_name, category_create) VALUES
('Phở', CURRENT_DATE),
('Bún', CURRENT_DATE),
('Cơm Tấm', CURRENT_DATE),
('Bánh Mì', CURRENT_DATE),
('Gỏi Cuốn', CURRENT_DATE);

-- Thêm dữ liệu cho bảng product
INSERT INTO product (product_name, store_id, category_id, product_image, product_create, product_price, product_rate, product_quantity, product_description) VALUES
('Phở Bò Đặc Biệt', 1, 1, NULL, CURRENT_DATE, 50000, 5, 100, 'Phở bò đặc biệt với nước dùng đậm đà, thịt bò tươi ngon.'),
('Bún Chả Nướng', 2, 2, NULL, CURRENT_DATE, 45000, 4, 80, 'Bún chả nướng thơm lừng, chả thịt được nướng vàng ươm.'),
('Cơm Tấm Sườn Bì Chả', 3, 3, NULL, CURRENT_DATE, 40000, 5, 120, 'Cơm tấm truyền thống với sườn nướng, bì và chả thơm ngon.'),
('Bánh Mì Thịt Nguội', 4, 4, NULL, CURRENT_DATE, 30000, 4, 150, 'Bánh mì thịt nguội, rau sống, dưa leo và pate.'),
('Gỏi Cuốn Tôm Thịt', 5, 5, NULL, CURRENT_DATE, 25000, 5, 200, 'Gỏi cuốn tươi ngon với tôm, thịt và rau sống.');

-- Thêm dữ liệu cho bảng order
INSERT INTO "order" (user_id, order_create) VALUES
(3, CURRENT_TIMESTAMP),
(5, CURRENT_TIMESTAMP),
(3, CURRENT_TIMESTAMP),
(5, CURRENT_TIMESTAMP),
(3, CURRENT_TIMESTAMP);

-- Thêm dữ liệu cho bảng shipping
INSERT INTO shipping (full_name, email, phone, address, ship_create, order_id) VALUES
('Nguyễn Văn A', 'nguyenvanA@gmail.com', '0912345678', '123 Đường Lê Lợi, Quận 1, TP. HCM', CURRENT_TIMESTAMP, 1),
('Trần Thị B', 'tranthib@gmail.com', '0911222333', '456 Đường Hai Bà Trưng, Quận 3, TP. HCM', CURRENT_TIMESTAMP,-- 2),
('Lê Quang C', 'lequangc@gmail.com', '0911999888', '789 Đường Nguyễn Huệ, Quận 1, TP. HCM', CURRENT_TIMESTAMP, 3),
('Phạm Thu D', 'phamthud@gmail.com', '0905666777', '101 Đường Trần Hưng Đạo, Quận 5, TP. HCM', CURRENT_TIMESTAMP, 4),
('Hoàng Văn E', 'hoangvane@gmail.com', '0904333222', '202 Đường Cách Mạng Tháng 8, Quận 10, TP. HCM', CURRENT_TIMESTAMP, 5);


-- Thêm dữ liệu cho bảng order_product
INSERT INTO order_product (order_id, product_id, order_price, order_quantity) VALUES
(1, 1, 50000, 2),
(1, 3, 40000, 1),
(2, 2, 45000, 3),
(3, 4, 30000, 4),
(4, 5, 25000, 5);
