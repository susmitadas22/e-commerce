"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Search, SortAsc, SortDesc } from "lucide-react";

const sortByOptions = [
  { label: "Name", value: "name" },
  { label: "Price", value: "price" },
  { label: "Created At", value: "createdAt" },
];

const sortOrderOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useQueryState("search");
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [sortOrder, setSortOrder] = useQueryState("order");

  const onFilterChange = useDebouncedCallback(
    (next) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(next).forEach(([key, value]) => {
        if (value) params.set(key, value as any);
        else params.delete(key);
      });
      router.push(`?${params.toString()}`);
    },
    300,
    { leading: false, trailing: true }
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, sortBy: sortBy, order: sortOrder });
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
    onFilterChange({ search, sortBy: value, order: sortOrder });
  };

  const handleSortOrder = (value: string) => {
    setSortOrder(value);
    onFilterChange({ search, sortBy: sortBy, order: value });
  };

  return (
    <div className="flex md:flex-row flex-col gap-4 items-center py-4">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          className="pl-10"
          placeholder="Search products…"
          value={search ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="md:w-1/3 w-full flex gap-4">
        <Select value={sortBy ?? ""} onValueChange={handleSortBy}>
          <SelectTrigger className="w-full">
            {sortByOptions.find((o) => o.value === (sortBy ?? ""))?.label ||
              "Sort By"}
          </SelectTrigger>
          <SelectContent>
            {sortByOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOrder ?? ""} onValueChange={handleSortOrder}>
          <SelectTrigger className="w-full flex items-center gap-2">
            {sortOrder === "asc" ? (
              <SortAsc size={16} />
            ) : (
              <SortDesc size={16} />
            )}
            {sortOrderOptions.find((o) => o.value === (sortOrder ?? ""))
              ?.label || "Order"}
          </SelectTrigger>
          <SelectContent>
            {sortOrderOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
