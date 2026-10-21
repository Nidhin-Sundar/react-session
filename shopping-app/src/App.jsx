import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {!isAuthPage && <Navbar />}

      <main className={isAuthPage ? "flex-1 flex items-center justify-center p-4 sm:p-6" : "mx-auto max-w-7xl px-6 py-12 w-full flex-1"}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes — ProtectedRoute checks sessionStorage */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;