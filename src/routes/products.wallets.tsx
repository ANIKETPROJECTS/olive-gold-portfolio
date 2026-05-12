import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/products";
import { CategoryPage } from "./products.tshirts";

export const Route = createFileRoute("/products/wallets")({
  component: () => <CategoryPage category={categories.wallets} />,
});
