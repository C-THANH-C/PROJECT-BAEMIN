-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS category_category_id_seq;

-- Table Definition
CREATE TABLE "public"."category" (
    "category_id" int4 NOT NULL DEFAULT nextval('category_category_id_seq'::regclass),
    "category_name" varchar NOT NULL,
    "category_create" date,
    PRIMARY KEY ("category_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS food_store_store_id_seq;

-- Table Definition
CREATE TABLE "public"."food_store" (
    "store_id" int4 NOT NULL DEFAULT nextval('food_store_store_id_seq'::regclass),
    "user_id" int4,
    "store_name" varchar NOT NULL,
    "address" varchar NOT NULL,
    "store_information" json,
    "store_image" _text,
    CONSTRAINT "food_store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE,
    PRIMARY KEY ("store_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_order_id_seq;

-- Table Definition
CREATE TABLE "public"."order" (
    "order_id" int4 NOT NULL DEFAULT nextval('order_order_id_seq'::regclass),
    "user_id" int4,
    "order_create" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE,
    PRIMARY KEY ("order_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."order_product" (
    "order_id" int4 NOT NULL,
    "product_id" int4 NOT NULL,
    "order_price" int4,
    "order_quantity" int4,
    CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE CASCADE,
    CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE CASCADE,
    PRIMARY KEY ("order_id","product_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS product_product_id_seq;

-- Table Definition
CREATE TABLE "public"."product" (
    "product_id" int4 NOT NULL DEFAULT nextval('product_product_id_seq'::regclass),
    "product_name" varchar NOT NULL,
    "store_id" int4,
    "category_id" int4,
    "product_image" _text,
    "product_create" timestamp DEFAULT CURRENT_TIMESTAMP,
    "product_price" int4,
    "product_rate" int4,
    "product_quantity" int4,
    "product_description" text,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE CASCADE,
    CONSTRAINT "product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."food_store"("store_id") ON DELETE CASCADE,
    PRIMARY KEY ("product_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS shipping_ship_id_seq;

-- Table Definition
CREATE TABLE "public"."shipping" (
    "ship_id" int4 NOT NULL DEFAULT nextval('shipping_ship_id_seq'::regclass),
    "full_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "phone" varchar NOT NULL,
    "address" varchar,
    "ship_create" timestamp DEFAULT CURRENT_TIMESTAMP,
    "order_id" int4,
    CONSTRAINT "shipping_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE CASCADE,
    PRIMARY KEY ("ship_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;
DROP TYPE IF EXISTS "public"."user_role";
CREATE TYPE "public"."user_role" AS ENUM ('admin', 'store', 'user');

-- Table Definition
CREATE TABLE "public"."users" (
    "user_id" int4 NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    "email" varchar(255) NOT NULL,
    "phone" varchar(15),
    "account" varchar(100) NOT NULL,
    "full_name" varchar(255) NOT NULL,
    "address" varchar(255),
    "user_image" _text,
    "role" "public"."user_role" NOT NULL,
    "user_create" timestamp,
    "password" varchar(100) NOT NULL,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('7e58536b-7ece-4481-bef5-f967f1ba56d4', '68b2b789c0b383103a5a3f9e3d0d1d19bd1a35002b14ff61ae13e3976c6c91f3', '2024-10-18 14:32:13.217614+00', '20241018143212_add_cascade_delete', NULL, NULL, '2024-10-18 14:32:12.699052+00', 1);
INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('234338ff-0d48-4ad4-9fc2-4c81c292d554', '3dc4515db56e9121cbc4097c568d14f069c3c87c41cf8542a630e0d16f32fd9c', '2024-10-18 14:33:38.9097+00', '20241018143338_add_cascade_delete', NULL, NULL, '2024-10-18 14:33:38.86326+00', 1);


INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(1, 'Phở', '2024-10-12');
INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(4, 'Bánh Mì', '2024-10-12');
INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(5, 'Gỏi Cuốn', '2024-10-12');
INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(3, 'Ga1', '2024-10-16'),
(6, 'Heo', '2024-10-16');

INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(6, 1, 'Quán Ăn Ngon', '123 Đường ABC, Quận 1, TP. Hồ Chí Minh', '{"opening_hours": "8:00-22:00"}', '{image1.jpg,image2.jpg}');
INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(7, 2, 'Nhà Hàng A', '456 Đường DEF, Quận 3, TP. Hồ Chí Minh', '{"opening_hours": "9:00-21:00"}', '{image3.jpg,image4.jpg}');
INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(8, 3, 'Bún Chả Hà Nội', '789 Đường GHI, Quận 5, TP. Hồ Chí Minh', '{"opening_hours": "10:00-23:00"}', '{image5.jpg,image6.jpg}');
INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(9, 4, 'Cơm Tấm Sài Gòn', '321 Đường JKL, Quận 2, TP. Hồ Chí Minh', '{"opening_hours": "7:00-20:00"}', '{image7.jpg,image8.jpg}'),
(10, 5, 'Phở 24', '654 Đường MNO, Quận 4, TP. Hồ Chí Minh', '{"opening_hours": "6:00-22:00"}', '{image9.jpg,image10.jpg}'),
(11, 1, 'Quán Ăn Ngon', '123 Đường ABC, Quận 1, TP. Hồ Chí Minh', '{"opening_hours": "8:00-22:00"}', '{image1.jpg,image2.jpg}'),
(12, 2, 'Nhà Hàng A', '456 Đường DEF, Quận 3, TP. Hồ Chí Minh', '{"opening_hours": "9:00-21:00"}', '{image3.jpg,image4.jpg}'),
(13, 3, 'Bún Chả Hà Nội', '789 Đường GHI, Quận 5, TP. Hồ Chí Minh', '{"opening_hours": "10:00-23:00"}', '{image5.jpg,image6.jpg}'),
(14, 4, 'Cơm Tấm Sài Gòn', '321 Đường JKL, Quận 2, TP. Hồ Chí Minh', '{"opening_hours": "7:00-20:00"}', '{image7.jpg,image8.jpg}'),
(15, 5, 'Phở 24', '654 Đường MNO, Quận 4, TP. Hồ Chí Minh', '{"opening_hours": "6:00-22:00"}', '{image9.jpg,image10.jpg}'),
(16, 1, 'Quán Ăn Ngon', '123 Đường ABC, Quận 1, TP. Hồ Chí Minh', '{"opening_hours": "8:00-22:00"}', '{image1.jpg,image2.jpg}'),
(17, 2, 'Nhà Hàng A', '456 Đường DEF, Quận 3, TP. Hồ Chí Minh', '{"opening_hours": "9:00-21:00"}', '{image3.jpg,image4.jpg}'),
(18, 3, 'Bún Chả Hà Nội', '789 Đường GHI, Quận 5, TP. Hồ Chí Minh', '{"opening_hours": "10:00-23:00"}', '{image5.jpg,image6.jpg}'),
(19, 4, 'Cơm Tấm Sài Gòn', '321 Đường JKL, Quận 2, TP. Hồ Chí Minh', '{"opening_hours": "7:00-20:00"}', '{image7.jpg,image8.jpg}'),
(20, 5, 'Phở 24', '654 Đường MNO, Quận 4, TP. Hồ Chí Minh', '{"opening_hours": "6:00-22:00"}', '{image9.jpg,image10.jpg}');

INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(1, 1, '2024-10-18 10:00:00');
INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(2, 2, '2024-10-18 11:00:00');
INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(3, 3, '2024-10-18 12:00:00');
INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(4, 4, '2024-10-18 13:00:00'),
(5, 5, '2024-10-18 14:00:00');

INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(1, 56, 50000, 2);
INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(2, 57, 45000, 3);
INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(3, 58, 55000, 1);
INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(4, 59, 200000, 1),
(5, 59, 70000, 5);

INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(56, 'Phở Bò', 6, 1, '{pho_bo1.jpg,pho_bo2.jpg}', '2024-10-18 14:51:38.169988', 50000, 5, 100, 'Phở bò Hà Nội chính gốc');
INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(57, 'Cơm Tấm', 7, 1, '{com_tam1.jpg,com_tam2.jpg}', '2024-10-18 14:51:38.169988', 45000, 4, 150, 'Cơm tấm sườn bì chả');
INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(58, 'Bún Chả', 8, 1, '{bun_cha1.jpg,bun_cha2.jpg}', '2024-10-18 14:51:38.169988', 55000, 5, 120, 'Bún chả đặc sản Hà Nội');
INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(59, 'Pizza', 9, 3, '{pizza1.jpg,pizza2.jpg}', '2024-10-18 14:51:38.169988', 200000, 4, 50, 'Pizza phong cách Ý'),
(60, 'Kimchi', 10, 1, '{kimchi1.jpg,kimchi2.jpg}', '2024-10-18 14:51:38.169988', 70000, 4, 200, 'Kimchi Hàn Quốc chuẩn vị');

INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(1, 'Nguyễn Văn A', 'nguyenvan.a@example.com', '0909123456', '123 Đường ABC, Quận 1, TP. Hồ Chí Minh', '2024-10-18 14:53:27.291149', 1);
INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(2, 'Trần Thị B', 'tranthi.b@example.com', '0909876543', '456 Đường DEF, Quận 3, TP. Hồ Chí Minh', '2024-10-18 14:53:27.291149', 2);
INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(3, 'Phạm Minh C', 'phamminh.c@example.com', '0909765432', '789 Đường GHI, Quận 5, TP. Hồ Chí Minh', '2024-10-18 14:53:27.291149', 3);
INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(4, 'Lê Đình D', 'ledinh.d@example.com', '0909654321', '321 Đường JKL, Quận 2, TP. Hồ Chí Minh', '2024-10-18 14:53:27.291149', 4),
(5, 'Đỗ Thị E', 'dothi.e@example.com', '0909543210', '654 Đường MNO, Quận 4, TP. Hồ Chí Minh', '2024-10-18 14:53:27.291149', 5);

INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(4, 'phamthud@gmail.com', '0905666777', 'phamthud', 'Phạm Thu D', '101 Đường Trần Hưng Đạo, Quận 5, TP. HCM', '{NULL}', 'store', '2024-10-12 02:44:03.186', 'passwordabc');
INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(5, 'hoangvane@gmail.com', '0904333222', 'hoangvane', 'Hoàng Văn E', '202 Đường Cách Mạng Tháng 8, Quận 10, TP. HCM', '{NULL}', 'user', '2024-10-12 02:44:03.186', 'passworddef');
INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(1, 'thanh@gmail.com', '012345671', 'levanthanh', 'le thanh', 'HCM city', '{http://surl.li/cpxhts}', 'admin', '2024-10-14 09:44:05.184', '$2b$10$4MY5/L7W4.PZpym7NUuUaOAN6Z9P9ZTvqR1/SgxB4p7.6qy/zyNhC');
INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(10, 'thanh2@gmail.com', NULL, 'levanthanh2', 'le thanh', 'HCM city ', '{NULL}', 'store', '2024-10-14 09:28:47.169', '$2b$10$tCXkvS4pjc92bag3zJ/Fn.Y3Brv6xrdBmACfUcGfEz9OFxDOGzvcy'),
(6, 'thanh1@gmail.com', '01234567', 'levanthanh1', 'le thanh', 'HCM city ', '{NULL}', 'user', '2024-10-14 09:12:32.89', '$2b$10$zRKqWCxsUcL.I/VFa6sQSuR4nkai1Us3uaSVEER283bQV1NltOBky'),
(3, 'thanh3@gmail.com', '0123456712', 'levanthanh3', 'le thanh', 'HCM city', '{NULL}', 'store', '2024-10-15 12:50:40.86', '$2b$10$cYJ4SG4ZLFsF/3vy3JH/Y.rMMsdzufrKFUGJyxA/bzAtm8mqUtula'),
(2, 'thanh4@gmail.com', '123334445', 'levanthanh4', 'le thanh', '123, hcm', '{1729238812932-1.png}', 'admin', '2024-10-18 08:06:53.136', '$2b$10$I2jAtye8OO9zk.21FnJKwuF5iSpqjYTorKXT3Krc84w0II/QBy9f6');
