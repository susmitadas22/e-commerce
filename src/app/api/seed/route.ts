import { prisma } from "~/lib/db";
import { faker } from "@faker-js/faker";
import { Products } from "~/generated/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. delete all existing products
  await prisma.products.deleteMany();

  // 2. create 10 new products
  const products: Array<Omit<Products, "id">> = [];
  for (let i = 0; i < 10; i++) {
    products.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.urlPicsumPhotos(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // 3. save to db
  await prisma.products.createMany({ data: products });

  return NextResponse.json({ message: "Seeded 10 products" });
}
