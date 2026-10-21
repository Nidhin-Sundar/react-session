import { Search, ShoppingCart, Heart, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";
import { selectWishlistCount } from "../store/wishlistSlice";

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn"); // clear session
    navigate("/");                           // redirect to login
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/home" className="text-2xl font-black tracking-tight text-blue-600 hover:opacity-90 transition">
          Shopify<span className="text-amber-500">.</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/home" className="font-medium text-gray-700 transition hover:text-blue-600">Home</Link>
          <Link to="/products" className="font-medium text-gray-700 transition hover:text-blue-600">Products</Link>
          <Link to="/wishlist" className="font-medium text-gray-700 transition hover:text-blue-600">Wishlist</Link>
          <Link to="/checkout" className="font-medium text-gray-700 transition hover:text-blue-600">Checkout</Link>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-4">
          <Link to="/products" className="text-gray-600 transition hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100" aria-label="Search">
            <Search size={21} />
          </Link>

          {/* Wishlist with live badge */}
          <Link
            to="/wishlist"
            className="relative text-gray-600 transition hover:text-red-500 p-2 rounded-lg hover:bg-gray-100"
            aria-label="Wishlist"
          >
            <Heart size={21} />
            {wishlistCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart with live badge */}
          <Link
            to="/cart"
            className="relative text-gray-600 transition hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={21} />
            {cartCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-gray-600 transition hover:text-red-500 p-2 rounded-lg hover:bg-red-50"
            aria-label="Logout"
          >
            <LogOut size={21} />
            <span className="hidden md:inline text-sm font-medium">Logout</span>
          </button>

          <button className="text-gray-600 md:hidden" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
