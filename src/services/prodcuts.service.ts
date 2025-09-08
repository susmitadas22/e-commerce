import { prisma } from "~/lib/db";

export const productsService = {
  getAllProducts: async ({
    search,
    sortBy,
    order,
  }: {
    search?: string | null;
    sortBy?: "price" | "name" | "createdAt";
    order?: "asc" | "desc";
  } = {}) => {
    return prisma.products.findMany({
      where: search
        ? { OR: [{ name: { contains: search, mode: "insensitive" } }] }
        : {},
      orderBy:
        sortBy === "price"
          ? { price: order === "desc" ? "desc" : "asc" }
          : sortBy === "name"
          ? { name: order === "desc" ? "desc" : "asc" }
          : undefined,
    });
  },
};
