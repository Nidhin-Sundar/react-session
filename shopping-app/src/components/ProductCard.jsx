import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "../store/wishlistSlice";

function ProductCard({ id, name, category, price, oldPrice, rating, reviews, stock, discount, image }) {
  const dispatch = useDispatch();
  const wishlisted = useSelector(selectIsInWishlist(id));

  const product = { id, name, category, price, oldPrice, rating, reviews, stock, discount, image };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">

      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 flex items-center justify-center p-4">
        <Link to={`/products/${id}`} className="h-full w-full flex items-center justify-center">
          <img src={image} alt={name} className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105" />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition transform active:scale-90 ${
            wishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-xs uppercase font-semibold tracking-wider text-blue-600">{category}</p>
          <Link to={`/products/${id}`}>
            <h2 className="mt-1 text-lg font-bold text-gray-900 line-clamp-1 hover:text-blue-600 transition">{name}</h2>
          </Link>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-sm font-medium text-white">
              <Star size={14} fill="currentColor" />
              <span>{rating}</span>
            </div>
            <span className="text-sm text-gray-500">{reviews} Reviews</span>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
            <span className="text-sm text-gray-400 line-through">₹{oldPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Add to Cart */}
        {stock > 0 ? (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        ) : (
          <button disabled className="mt-5 w-full cursor-not-allowed rounded-xl bg-gray-300 px-4 py-3 font-semibold text-gray-600">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;