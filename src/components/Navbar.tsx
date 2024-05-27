import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-2 w-full bg-gray-200 border-b border-zinc-400 shadow-lg">
      <div>
        <h3>TeeRex Store</h3>
      </div>
      <div className="flex items-center gap-x-6">
        <Link href="/" className="font-medium">
          Products
        </Link>
        <Link href="/cart" className={buttonVariants()}>
          <ShoppingCart className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
