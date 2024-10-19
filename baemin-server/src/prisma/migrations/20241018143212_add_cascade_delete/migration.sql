-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'store', 'user');

-- CreateTable
CREATE TABLE "category" (
    "category_id" SERIAL NOT NULL,
    "category_name" VARCHAR NOT NULL,
    "category_create" DATE,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "food_store" (
    "store_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "store_name" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "store_information" JSON,
    "store_image" TEXT[],

    CONSTRAINT "food_store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "order" (
    "order_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "order_create" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "order_product" (
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_price" INTEGER,
    "order_quantity" INTEGER,

    CONSTRAINT "order_product_pkey" PRIMARY KEY ("order_id","product_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "product_name" VARCHAR NOT NULL,
    "store_id" INTEGER,
    "category_id" INTEGER,
    "product_image" TEXT[],
    "product_create" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "product_price" INTEGER,
    "product_rate" INTEGER,
    "product_quantity" INTEGER,
    "product_description" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "shipping" (
    "ship_id" SERIAL NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "address" VARCHAR,
    "ship_create" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER,

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("ship_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15),
    "account" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "user_image" TEXT[],
    "role" "user_role" NOT NULL,
    "user_create" TIMESTAMP(6),
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_account_key" ON "users"("account");

-- AddForeignKey
ALTER TABLE "food_store" ADD CONSTRAINT "food_store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "food_store"("store_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
