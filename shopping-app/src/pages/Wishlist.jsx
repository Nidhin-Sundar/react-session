import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWishlistItems,
  removeFromWishlist,
  clearWishlist,
} from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);

  // 1-Click Move to Cart
  function handleMoveToCart(item) {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  }

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mt-2">Explore our catalog and save items you like!</p>
        <Link
          to="/products"
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
        >
          Browse Products <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Wishlist ({wishlistItems.length})
        </h1>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="text-sm font-medium text-red-500 hover:text-red-700 transition"
        >
          Clear All
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-50 rounded-xl flex items-center justify-center p-4">
              <Link to={`/products/${item.id}`} className="h-full w-full flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                title="Remove"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Info */}
            <div className="mt-4 flex flex-col flex-1 justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase">{item.category}</p>
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-bold text-gray-900 mt-1 line-clamp-1 hover:text-blue-600 transition">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ₹{item.price?.toLocaleString()}
                </p>
              </div>

              {/* Move to Cart Button */}
              <button
                onClick={() => handleMoveToCart(item)}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                <ShoppingCart size={16} />
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;