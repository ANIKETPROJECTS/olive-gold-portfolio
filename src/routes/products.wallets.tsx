import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/lib/products";
import { CategoryPage } from "./products.tshirts";

export const Route = createFileRoute("/products/wallets")({
  head: () => ({
    meta: [
      { title: "Custom Wallets — OLIIVELINE" },
      {
        name: "description",
        content:
          "Handcrafted custom wallets for corporate gifting, retail, and personal collections — by OLIIVELINE.",
      },
    ],
  }),
  component: () => <CategoryPage category={categories.wallets} />,
});
