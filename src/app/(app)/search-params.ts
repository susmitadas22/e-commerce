import { createLoader, parseAsString, parseAsStringLiteral } from "nuqs/server";

const sortByEnum = ["price", "name", "createdAt"] as const;
const orderEnum = ["asc", "desc"] as const;

export const loadSearchParams = createLoader({
  search: parseAsString,
  sortBy: parseAsStringLiteral(sortByEnum).withDefault("createdAt"),
  order: parseAsStringLiteral(orderEnum).withDefault("desc"),
});
