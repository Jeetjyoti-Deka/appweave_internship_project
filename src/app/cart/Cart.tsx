"use client";

import { Product } from "@/lib/data";
import { capitalize, cn, formatPrice } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { addItem, removeItem } from "@/redux/slice/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-y-3 max-w-screen-lg mx-auto px-3">
      <h2 className="text-center font-semibold text-2xl mt-6 mb-10">
        Shopping Cart
      </h2>
      {cart.map((item) => (
        <CartRow key={item.id} item={item} />
      ))}
      <div className="grid grid-cols-2">
        <h4 className="sm:justify-self-end font-semibold">Total Amount</h4>
        <p className="sm:justify-self-center min-[320px]:-ml-9 sm:-ml-44">
          {formatPrice(totalPrice)}
        </p>
      </div>
    </div>
  );
};

const CartRow = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="sm:grid grid-cols-[15%,85%] min-[798px]:grid-cols-[10%,90%] border-b border-gray-400 pb-2">
      <div className="flex items-center justify-start gap-x-3">
        <div className="relative w-20 h-20 bg-gray-200 rounded-sm">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-contain w-full"
          />
        </div>
        <div className="block sm:hidden">
          <h3 className="font-semibold">{capitalize(item.name)}</h3>
          <p className="font-medium text-sm text-gray-600">
            {formatPrice(item.price)}
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 grid grid-cols-3 sm:grid-cols-4 items-center">
        <div className="hidden sm:block">
          <h3 className="font-semibold">{capitalize(item.name)}</h3>
          <p className="font-medium text-sm text-gray-600">
            {formatPrice(item.price)}
          </p>
        </div>
        <div className="sm:place-self-center">
          <QuantitySelect item={item} />
        </div>
        <div className="place-self-center">
          <p>{formatPrice(item.price * item.quantity)}</p>
        </div>
        <div className="justify-self-end sm:place-self-center">
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(removeItem(item));
            }}
          >
            <Trash className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const QuantitySelect = ({ item }: { item: Product }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useAppDispatch();

  const handleValueChange = (val: number) => {
    if (val > item.availableStock) {
      toast({
        title: "Oops! Not Enough Stock",
        description:
          "It looks like the quantity you want exceeds our current stock. Please adjust the quantity or check back later for availability.",
        variant: "destructive",
      });
    } else {
      setQuantity(val);
      dispatch(addItem({ ...item, quantity: val }));
    }
  };

  return (
    <div>
      <Select
        defaultValue={item.quantity.toString()}
        value={quantity.toString()}
        onValueChange={(v) => handleValueChange(Number(v))}
      >
        <SelectTrigger className="w-[90px] sm:w-[130px] md:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array(50)
            .fill(0)
            .map((_, index) => (
              <SelectItem
                key={index}
                value={(index + 1).toString()}
                className={cn({
                  "bg-gray-200 focus:bg-gray-200 text-gray-500 focus:text-gray-500":
                    index + 1 > item.availableStock,
                })}
              >
                {index + 1}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default Cart;
