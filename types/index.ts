export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  stock: number;
  categorySlug: string;
  categoryName: string;
  materials: string;
  dimensions: string;
  featured: boolean;
  isHeroBackground: boolean;
  isHeroCard: boolean;
  catalogUrl?: string;
  images: ProductImage[];
};
