/*
  Warnings:

  - Made the column `subcategory_id` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subcategory_id_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "subcategory_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategory"("subcategory_id") ON DELETE RESTRICT ON UPDATE CASCADE;
