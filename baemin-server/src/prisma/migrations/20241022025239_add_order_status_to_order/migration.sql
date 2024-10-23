-- AlterTable
ALTER TABLE "order" ADD COLUMN     "order_status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "base_path" VARCHAR(255);
