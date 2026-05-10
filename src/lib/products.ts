const tshirtMods = import.meta.glob("../assets/products/tshirts/*.jpeg", {
  eager: true,
  import: "default",
});
const walletMods = import.meta.glob("../assets/products/wallets/*.jpeg", {
  eager: true,
  import: "default",
});

export const tshirtImages = Object.values(tshirtMods) as string[];
export const walletImages = Object.values(walletMods) as string[];

export type ProductCategory = {
  slug: "tshirts" | "wallets";
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  images: string[];
};

export const categories: Record<"tshirts" | "wallets", ProductCategory> = {
  tshirts: {
    slug: "tshirts",
    title: "Custom Oliive Line T-Shirts",
    tagline: "Bulk custom-printed tees, crafted with intent.",
    description:
      "Bulk custom-printed tees for offices, events, brands & more. Premium fabrics, precise prints, any quantity.",
    tags: ["Bulk Orders", "Office Wear", "Custom Print"],
    images: tshirtImages,
  },
  wallets: {
    slug: "wallets",
    title: "Custom Oliive Line Wallets",
    tagline: "Handcrafted wallets, finished by hand.",
    description:
      "Handcrafted wallets with custom branding. Perfect for corporate gifts, retail, or personal collections.",
    tags: ["Corporate Gifting", "Custom Branding", "Premium Leather"],
    images: walletImages,
  },
};
