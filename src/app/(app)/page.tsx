import { api } from "~/services";
import { ProductCard } from "../_components/product-card";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./search-params";
import { ProductFilter } from "./_components/filter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { order, search, sortBy } = await loadSearchParams(searchParams);
  const items = await api.products.getAllProducts({ order, search, sortBy });
  return (
    <div className="p-8">
      <ProductFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
