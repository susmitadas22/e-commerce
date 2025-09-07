import { prisma } from "~/lib/db";

export const productsService = {
  getAllProducts: () => {
    return prisma.products.findMany();
  },
};
