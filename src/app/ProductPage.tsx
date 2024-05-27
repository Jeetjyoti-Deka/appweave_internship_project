"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product, PRODUCTS } from "@/lib/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { capitalize, formatPrice, getPaginatedProducts } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2, Plus, Search } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setPage(1);
  }, [products]);

  useEffect(() => {
    const paginatedProducts = getPaginatedProducts(page, products);
    setPaginatedProducts(paginatedProducts.products);
    setTotalPages(paginatedProducts.totalPages);
  }, [page, products]);

  const applyFilters = (
    color: string,
    type: string,
    gender: string,
    price: string
  ) => {
    let products = PRODUCTS;
    if (color !== "") {
      products = products.filter((product) => product.color === color);
    }

    if (type !== "") {
      products = products.filter((product) => product.type === type);
    }

    if (gender !== "") {
      products = products.filter((product) => product.gender === gender);
    }

    if (price !== "") {
      if (price === "0-250") {
        products = products.filter((product) => product.price <= 250);
      } else if (price === "251-450") {
        products = products.filter(
          (product) => product.price > 250 && product.price <= 450
        );
      } else if (price === "above") {
        products = products.filter((product) => product.price > 450);
      }
    }

    setProducts(products);
  };

  const applySearch = (searchText: string) => {
    if (searchText === "") {
      return;
    }
    let searchedProducts: Product[] = [];
    let products = PRODUCTS;
    searchedProducts.push(
      ...products.filter((product) => product.name.includes(searchText))
    );
    const searchArr = searchText.split(" ").map((word) => word.toLowerCase());
    searchArr.forEach((word) => {
      let colorProducts = products.filter((product) => product.color === word);
      let typeProducts = products.filter((product) => product.type === word);

      colorProducts.forEach((product) => {
        if (!searchedProducts.includes(product)) {
          searchedProducts.push(product);
        }
      });

      typeProducts.forEach((product) => {
        if (!searchedProducts.includes(product)) {
          searchedProducts.push(product);
        }
      });
    });

    setProducts(searchedProducts);
  };

  return (
    <div className="mt-10 px-6">
      <div className="mb-6 flex items-center justify-center">
        <SearchBar applySearch={applySearch} />
      </div>
      <div className="grid grid-cols-[20%,80%] gap-x-6">
        <div>
          <Filters applyFilters={applyFilters} setProducts={setProducts} />
        </div>
        <div>
          <ProductSection products={paginatedProducts} />
          {paginatedProducts.length >= 1 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

const Filters = ({
  applyFilters,
  setProducts,
}: {
  applyFilters: (
    color: string,
    type: string,
    gender: string,
    price: string
  ) => void;
  setProducts: Dispatch<SetStateAction<Product[]>>;
}) => {
  const [color, setColor] = useState<"red" | "green" | "blue" | "">("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [type, setType] = useState<"basic" | "hoodie" | "polo" | "">("");
  const [price, setPrice] = useState<"0-250" | "251-450" | "above" | "">("");

  return (
    <div className="bg-white shadow-xl rounded-sm border border-zinc-200 p-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-lg">Color</h3>
          <RadioGroup
            value={color}
            onValueChange={(v: "red" | "green" | "blue") => setColor(v)}
          >
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
          <RadioGroup
            value={gender}
            onValueChange={(v: "male" | "female") => setGender(v)}
          >
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
          <RadioGroup
            value={price}
            onValueChange={(v: "0-250" | "251-450" | "above") => setPrice(v)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0-250" id="0-250" />
              <Label htmlFor="0-250">0-250</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="251-450" id="251-450" />
              <Label htmlFor="251-450">251-450</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="above" id="above" />
              <Label htmlFor="above">Above 450</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-lg">Type</h3>
          <RadioGroup
            value={type}
            onValueChange={(v: "basic" | "hoodie" | "polo") => setType(v)}
          >
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

        <div className="flex items-center justify-between mt-4">
          <Button onClick={() => applyFilters(color, type, gender, price)}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setColor("");
              setGender("");
              setPrice("");
              setType("");
              setProducts(PRODUCTS);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ products }: { products: Product[] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (products.length === 0) {
    return (
      <div className="min-h-[520px] w-full flex flex-col gap-y-2 items-center justify-center">
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <h3 className="font-semibold text-xl">No Items Found.</h3>
            <p className="font-medium text-gray-400">
              Please try to find some other item.
            </p>
          </>
        )}
      </div>
    );
  }

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
            {capitalize(product.name)}
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

const SearchBar = ({
  applySearch,
}: {
  applySearch: (searchText: string) => void;
}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="w-[37%] -mr-64 flex items-center gap-x-2">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search here..."
        className="focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-offset-0"
      />
      <Button
        onClick={() => {
          applySearch(searchText);
          setSearchText("");
        }}
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ProductPage;
