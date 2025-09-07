import { auth } from "~/lib/auth";
import { api } from "~/services";
import { ProductCard } from "../_components/product-card";

export default async function Home() {
  const session = await auth();
  const items = await api.products.getAllProducts();
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
