const tshirtMods = import.meta.glob("../assets/products/tshirts/*.jpeg", {
  eager: true,
  import: "default",
});
const walletMods = import.meta.glob("../assets/products/wallets/*.jpeg", {
  eager: true,
  import: "default",
});

export type ImageEntry = {
  src: string;
  filename: string;
};

export type ImagePair = {
  type: "pair";
  a: ImageEntry;
  b: ImageEntry;
  baseKey: string;
};

export type ImageSingle = {
  type: "single";
  entry: ImageEntry;
};

export type GalleryItem = ImagePair | ImageSingle;

function toEntries(mods: Record<string, unknown>): ImageEntry[] {
  return Object.entries(mods).map(([path, src]) => ({
    src: src as string,
    filename: path.split("/").pop()!.replace(/\.\w+$/, ""),
  }));
}

function groupTshirts(entries: ImageEntry[]): GalleryItem[] {
  const sorted = [...entries].sort((a, b) => {
    const numA = parseInt(a.filename.replace(/\D/g, ""), 10);
    const numB = parseInt(b.filename.replace(/\D/g, ""), 10);
    return numA !== numB ? numA - numB : a.filename.localeCompare(b.filename);
  });

  const byBase = new Map<string, ImageEntry[]>();
  for (const entry of sorted) {
    const match = entry.filename.match(/^(.*?)([AB])$/i);
    if (match) {
      const base = match[1];
      if (!byBase.has(base)) byBase.set(base, []);
      byBase.get(base)!.push(entry);
    } else {
      byBase.set(entry.filename, [entry]);
    }
  }

  const items: GalleryItem[] = [];
  for (const [base, group] of byBase) {
    const aImg = group.find((e) => e.filename.toUpperCase().endsWith("A"));
    const bImg = group.find((e) => e.filename.toUpperCase().endsWith("B"));
    if (aImg && bImg) {
      items.push({ type: "pair", a: aImg, b: bImg, baseKey: base });
    } else {
      for (const entry of group) {
        items.push({ type: "single", entry });
      }
    }
  }
  return items;
}

export const tshirtEntries: ImageEntry[] = toEntries(tshirtMods);
export const walletImages = Object.values(walletMods) as string[];
export const tshirtGallery: GalleryItem[] = groupTshirts(tshirtEntries);
export const tshirtImages = tshirtEntries.map((e) => e.src);

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
