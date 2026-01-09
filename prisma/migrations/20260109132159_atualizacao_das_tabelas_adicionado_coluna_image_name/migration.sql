-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image_name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image_name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "image_name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "picture" BYTEA;
