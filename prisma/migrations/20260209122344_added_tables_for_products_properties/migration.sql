/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sku" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Product_Properties" (
    "product_properties_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "Product_Properties_pkey" PRIMARY KEY ("product_properties_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "property_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("property_id")
);

-- CreateTable
CREATE TABLE "Property_Options" (
    "property_options_id" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "Property_Options_pkey" PRIMARY KEY ("property_options_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_Options_sku_key" ON "Property_Options"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- AddForeignKey
ALTER TABLE "Product_Properties" ADD CONSTRAINT "Product_Properties_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_Properties" ADD CONSTRAINT "Product_Properties_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property_Options" ADD CONSTRAINT "Property_Options_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE RESTRICT ON UPDATE CASCADE;
