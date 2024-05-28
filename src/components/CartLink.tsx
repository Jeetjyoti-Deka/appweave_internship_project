"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

const CartLink = () => {
  const cart = useAppSelector((state) => state.cart.cart);

  return (
    <Link
      href="/cart"
      className={buttonVariants({
        className: "relative",
      })}
    >
      <ShoppingCart className="w-5 h-5" />
      <div className="absolute top-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-light">
        {cart.length}
      </div>
    </Link>
  );
};
export default CartLink;
