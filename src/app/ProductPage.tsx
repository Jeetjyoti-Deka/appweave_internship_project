"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product, PRODUCTS } from "@/lib/data";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatPrice, getPaginatedProducts } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const paginatedProducts = getPaginatedProducts(page, PRODUCTS);
    setProducts(paginatedProducts.products);
    setTotalPages(paginatedProducts.totalPages);
  }, [page]);

  return (
    <div className="mt-10 px-6">
      <div className="mb-6 flex items-center justify-center">
        <SearchBar />
      </div>
      <div className="grid grid-cols-[20%,80%] gap-x-6">
        <div>
          <Filters />
        </div>
        <div>
          <ProductSection products={products} />
          <div className="flex items-center justify-center gap-x-3 mt-6">
            <Button
              disabled={page === 1}
              variant="ghost"
              onClick={() => setPage((prev) => prev - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1.5" />
              Previous
            </Button>
            <Button
              disabled={page === totalPages}
              variant="ghost"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Filters = () => {
  return (
    <div className="bg-white shadow-xl rounded-sm border border-zinc-200 p-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-lg">Color</h3>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="red" id="red" />
              <Label htmlFor="red">Red</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blue" id="blue" />
              <Label htmlFor="blue">Blue</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="green" id="green" />
              <Label htmlFor="green">Green</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-lg">Gender</h3>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-lg">Price</h3>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">0-250</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">251-450</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Above 450</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-lg">Type</h3>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="polo" id="polo" />
              <Label htmlFor="polo">Polo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hoodie" id="hoodie" />
              <Label htmlFor="hoodie">Hoodie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="basic" />
              <Label htmlFor="basic">Basic</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-3 px-8 gap-y-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-[320px] place-self-center">
      <CardHeader className="relative p-2 pb-6">
        <div className="w-full h-44 p-4 rounded-lg bg-gray-300 relative">
          <CardTitle className="absolute top-2 left-2 z-20 bg-white/30 p-2 rounded-md">
            {product.name}
          </CardTitle>
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-contain w-full z-0"
          />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="font-medium">{formatPrice(product.price)}</p>
        <Button variant="outline">
          Add to cart
          <Plus className="w-4 h-4 ml-1.5" />
        </Button>
      </CardContent>
    </Card>
  );
};

const SearchBar = () => {
  return (
    <div className="w-[37%] -mr-64 flex items-center gap-x-2">
      <Input
        type="text"
        placeholder="Search here..."
        className="focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-offset-0"
      />
      <Button>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProductPage;
