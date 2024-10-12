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
    "store_image" text,
    CONSTRAINT "food_store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id"),
    PRIMARY KEY ("store_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_order_id_seq;

-- Table Definition
CREATE TABLE "public"."order" (
    "order_id" int4 NOT NULL DEFAULT nextval('order_order_id_seq'::regclass),
    "user_id" int4,
    "order_create" timestamp,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id"),
    PRIMARY KEY ("order_id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."order_product" (
    "order_id" int4 NOT NULL,
    "product_id" int4 NOT NULL,
    "order_price" int4,
    "order_quantity" int4,
    CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id"),
    CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id"),
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
    "product_image" text,
    "product_create" date,
    "product_price" int4,
    "product_rate" int4,
    "product_quantity" int4,
    "product_description" text,
    CONSTRAINT "product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."food_store"("store_id"),
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id"),
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
    "ship_create" timestamp,
    "order_id" int4,
    CONSTRAINT "fk_order_shipping" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id"),
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
    "user_image" text,
    "role" "public"."user_role" NOT NULL,
    "user_create" timestamp,
    "password" varchar(100) NOT NULL,
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(1, 'Phở', '2024-10-12');
INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(2, 'Bún', '2024-10-12');
INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(3, 'Cơm Tấm', '2024-10-12');
INSERT INTO "public"."category" ("category_id", "category_name", "category_create") VALUES
(4, 'Bánh Mì', '2024-10-12'),
(5, 'Gỏi Cuốn', '2024-10-12');

INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(1, 2, 'Quán Phở Hà Nội', '50 Đường Lý Tự Trọng, Quận 1, TP. HCM', '{"store_description": "Chuyên món phở bò Hà Nội.", "store_title": "Quán Phở Truyền Thống", "store_open": "6:00 - 22:00"}', NULL);
INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(2, 4, 'Bún Chả Hương Liên', '75 Đường Lê Thánh Tôn, Quận 1, TP. HCM', '{"store_description": "Bún chả ngon, phục vụ nhanh chóng.", "store_title": "Bún Chả Nổi Tiếng", "store_open": "9:00 - 20:00"}', NULL);
INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(3, 2, 'Cơm Tấm Ba Ghiền', '20 Đường Võ Văn Tần, Quận 3, TP. HCM', '{"store_description": "Cơm tấm Sài Gòn chuẩn vị.", "store_title": "Quán Cơm Tấm Ngon", "store_open": "10:00 - 21:00"}', NULL);
INSERT INTO "public"."food_store" ("store_id", "user_id", "store_name", "address", "store_information", "store_image") VALUES
(4, 4, 'Bánh Mì Huỳnh Hoa', '30 Đường Nguyễn Trãi, Quận 5, TP. HCM', '{"store_description": "Bánh mì thịt nguội, pate ngon nhất Sài Gòn.", "store_title": "Bánh Mì Huỳnh Hoa Nổi Tiếng", "store_open": "7:00 - 21:00"}', NULL),
(5, 2, 'Gỏi Cuốn Sài Gòn', '15 Đường Trần Quang Khải, Quận 1, TP. HCM', '{"store_description": "Gỏi cuốn tôm thịt đặc biệt.", "store_title": "Quán Gỏi Cuốn Sài Gòn", "store_open": "8:00 - 22:00"}', NULL);

INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(1, 3, '2024-10-12 02:46:49.274262');
INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(2, 5, '2024-10-12 02:46:49.274262');
INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(3, 3, '2024-10-12 02:46:49.274262');
INSERT INTO "public"."order" ("order_id", "user_id", "order_create") VALUES
(4, 5, '2024-10-12 02:46:49.274262'),
(5, 3, '2024-10-12 02:46:49.274262');

INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(1, 1, 50000, 2);
INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(1, 3, 40000, 1);
INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(2, 2, 45000, 3);
INSERT INTO "public"."order_product" ("order_id", "product_id", "order_price", "order_quantity") VALUES
(3, 4, 30000, 4),
(4, 5, 25000, 5);

INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(1, 'Phở Bò Đặc Biệt', 1, 1, NULL, '2024-10-12', 50000, 5, 100, 'Phở bò đặc biệt với nước dùng đậm đà, thịt bò tươi ngon.');
INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(2, 'Bún Chả Nướng', 2, 2, NULL, '2024-10-12', 45000, 4, 80, 'Bún chả nướng thơm lừng, chả thịt được nướng vàng ươm.');
INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(3, 'Cơm Tấm Sườn Bì Chả', 3, 3, NULL, '2024-10-12', 40000, 5, 120, 'Cơm tấm truyền thống với sườn nướng, bì và chả thơm ngon.');
INSERT INTO "public"."product" ("product_id", "product_name", "store_id", "category_id", "product_image", "product_create", "product_price", "product_rate", "product_quantity", "product_description") VALUES
(4, 'Bánh Mì Thịt Nguội', 4, 4, NULL, '2024-10-12', 30000, 4, 150, 'Bánh mì thịt nguội, rau sống, dưa leo và pate.'),
(5, 'Gỏi Cuốn Tôm Thịt', 5, 5, NULL, '2024-10-12', 25000, 5, 200, 'Gỏi cuốn tươi ngon với tôm, thịt và rau sống.');

INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(1, 'Nguyễn Văn A', 'nguyenvanA@gmail.com', '0912345678', '123 Đường Lê Lợi, Quận 1, TP. HCM', '2024-10-12 02:51:54.39513', 1);
INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(2, 'Trần Thị B', 'tranthib@gmail.com', '0911222333', '456 Đường Hai Bà Trưng, Quận 3, TP. HCM', '2024-10-12 02:51:54.39513', 2);
INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(3, 'Lê Quang C', 'lequangc@gmail.com', '0911999888', '789 Đường Nguyễn Huệ, Quận 1, TP. HCM', '2024-10-12 02:51:54.39513', 3);
INSERT INTO "public"."shipping" ("ship_id", "full_name", "email", "phone", "address", "ship_create", "order_id") VALUES
(4, 'Phạm Thu D', 'phamthud@gmail.com', '0905666777', '101 Đường Trần Hưng Đạo, Quận 5, TP. HCM', '2024-10-12 02:51:54.39513', 4),
(5, 'Hoàng Văn E', 'hoangvane@gmail.com', '0904333222', '202 Đường Cách Mạng Tháng 8, Quận 10, TP. HCM', '2024-10-12 02:51:54.39513', 5);

INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(1, 'thanh@gmail.com', '0123456789', 'levanthanh', 'LE VAN THANH', 'Đà Lạt, Đức Trọng, Lâm Đồng', 'http://surl.li/cpxhts', 'admin', '2024-10-12 02:44:03.186092', 'thanh');
INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(2, 'tranthib@gmail.com', '0911222333', 'tranthib', 'Trần Thị B', '456 Đường Hai Bà Trưng, Quận 3, TP. HCM', NULL, 'store', '2024-10-12 02:44:03.186092', 'password456');
INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(3, 'lequangc@gmail.com', '0911999888', 'lequangc', 'Lê Quang C', '789 Đường Nguyễn Huệ, Quận 1, TP. HCM', NULL, 'user', '2024-10-12 02:44:03.186092', 'password789');
INSERT INTO "public"."users" ("user_id", "email", "phone", "account", "full_name", "address", "user_image", "role", "user_create", "password") VALUES
(4, 'phamthud@gmail.com', '0905666777', 'phamthud', 'Phạm Thu D', '101 Đường Trần Hưng Đạo, Quận 5, TP. HCM', NULL, 'store', '2024-10-12 02:44:03.186092', 'passwordabc'),
(5, 'hoangvane@gmail.com', '0904333222', 'hoangvane', 'Hoàng Văn E', '202 Đường Cách Mạng Tháng 8, Quận 10, TP. HCM', NULL, 'user', '2024-10-12 02:44:03.186092', 'passworddef');
