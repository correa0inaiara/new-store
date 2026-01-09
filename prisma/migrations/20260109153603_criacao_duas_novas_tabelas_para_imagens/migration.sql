/*
  Warnings:

  - You are about to drop the column `image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image_name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `image_name` on the `Subcategory` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "image",
DROP COLUMN "image_name",
ALTER COLUMN "title" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "image_name";

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "image",
DROP COLUMN "image_name";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "picture";

-- CreateTable
CREATE TABLE "Banners" (
    "banner_id" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "image_name" TEXT NOT NULL,
    "category_id" TEXT,
    "subcategory_id" TEXT,

    CONSTRAINT "Banners_pkey" PRIMARY KEY ("banner_id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "product_image_id" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "image_name" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("product_image_id")
);
