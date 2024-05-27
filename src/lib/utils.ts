import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return formatter.format(price);
};

export const getPaginatedProducts = (
  page: number,
  products: Product[],
  limit: number = 6
) => {
  const start = (page - 1) * limit;
  const end = page * limit;

  return {
    products: products.slice(start, end),
    totalPages: Math.ceil(products.length / limit),
  };
};
