/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductInCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductInCart" DROP CONSTRAINT "ProductInCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProductInCart" DROP CONSTRAINT "ProductInCart_productId_fkey";

-- DropTable
DROP TABLE "public"."Cart";

-- DropTable
DROP TABLE "public"."ProductInCart";
