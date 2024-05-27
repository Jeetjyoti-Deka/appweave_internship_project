export type Product = {
  name: string;
  color: string;
  price: number;
  gender: "male" | "female";
  type: "hoodie" | "polo" | "basic";
  img: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Red Polo",
    color: "red",
    type: "polo",
    price: 200,
    gender: "male",
    img: "products/red.svg",
  },
  {
    name: "Blue Polo",
    color: "blue",
    type: "polo",
    price: 260,
    gender: "female",
    img: "products/blue.svg",
  },
  {
    name: "Green Polo",
    color: "green",
    type: "polo",
    price: 270,
    gender: "male",
    img: "products/green.svg",
  },
  {
    name: "Red Polo",
    color: "red",
    type: "polo",
    price: 200,
    gender: "male",
    img: "products/red.svg",
  },
  {
    name: "Red Polo",
    color: "red",
    type: "polo",
    price: 200,
    gender: "male",
    img: "products/red.svg",
  },
];
