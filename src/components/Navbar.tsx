import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import CartLink from "./CartLink";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-2 sm:px-6 py-2 w-full bg-gray-200 border-b border-zinc-400 shadow-lg">
      <div>
        <h3>TeeRex Store</h3>
      </div>
      <div className="flex items-center gap-x-6">
        <Link href="/" className="sm:font-medium">
          Products
        </Link>
        <CartLink />
      </div>
    </nav>
  );
};
export default Navbar;
