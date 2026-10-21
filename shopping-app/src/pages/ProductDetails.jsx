import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Heart, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { getProductById } from "../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist, selectIsInWishlist } from "../store/wishlistSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsInWishlist(parseInt(id)));

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        if (!data || Object.keys(data).length === 0) {
          setError("Product not found");
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "inc" && quantity < 10) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAdd = () => {
    const discountPercent = Math.round(product.discountPercentage) || 20;
    const priceInINR = Math.round(product.price * 80);
    const oldPriceInINR = Math.round(priceInINR * (1 + discountPercent / 100));

    const productToAdd = {
      id: product.id,
      name: product.title,
      category: product.category,
      price: priceInINR,
      oldPrice: oldPriceInINR,
      image: product.image || product.thumbnail,
    };
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(productToAdd));
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-lg font-medium text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-2xl font-bold text-gray-800">Oops!</p>
          <p className="mt-2 text-red-500">{error || "Product not found."}</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(product.discountPercentage) || 20;
  const priceInINR = Math.round(product.price * 80);
  const oldPriceInINR = Math.round(priceInINR * (1 + discountPercent / 100));

  return (
    <div className="mx-auto max-w-6xl">
      {/* Back Button & Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <nav className="text-sm text-gray-500">
          <Link to="/home" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="capitalize text-gray-800">{product.category}</span>
        </nav>
      </div>

      {/* Main Details Card */}
      <div className="overflow-hidden rounded-3xl bg-white p-6 shadow-sm sm:p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Left Column: Product Image */}
          <div className="relative flex min-h-[380px] items-center justify-center rounded-2xl bg-gray-50 p-8">
            <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {discountPercent}% OFF
            </span>

            <button
              onClick={() =>
                product &&
                dispatch(toggleWishlist({
                  id: product.id,
                  name: product.title,
                  category: product.category,
                  price: Math.round(product.price * 80),
                  oldPrice: Math.round(product.price * 80 * 1.25),
                  image: product.image,
                  rating: product.rating?.rate || 4.5,
                  reviews: product.rating?.count || 45,
                }))
              }
              className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 ${isWishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
              aria-label="Wishlist"
            >
              <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 w-auto max-w-full object-contain transition duration-500 hover:scale-105"
            />
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Badge */}
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-sm font-semibold text-white">
                  <Star size={16} fill="currentColor" />
                  <span>{product.rating?.rate || 4.5}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating?.count || 120} Ratings & Reviews
                </span>
                <span className="text-sm font-medium text-green-600">• In Stock</span>
              </div>

              <hr className="my-6 border-gray-100" />

              {/* Pricing */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-extrabold text-gray-900">
                  ₹{priceInINR.toLocaleString()}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{oldPriceInINR.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  Save ₹{(oldPriceInINR - priceInINR).toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Description</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-800">Quantity:</span>
                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-40 rounded-l-xl transition"
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    disabled={quantity >= 10}
                    className="flex h-10 w-10 items-center justify-center text-lg font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-40 rounded-r-xl transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleAdd}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg transition duration-200 ${addedAnimation
                    ? "bg-green-600 shadow-green-200"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                    }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={20} />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart ({quantity})
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className="flex items-center justify-center rounded-2xl border-2 border-gray-800 bg-gray-900 px-6 py-4 font-bold text-white transition hover:bg-gray-800 sm:flex-initial"
                >
                  Go to Cart
                </Link>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-2">
                  <Truck size={18} className="text-blue-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-2">
                  <RotateCcw size={18} className="text-blue-600" />
                  <span>7 Days Return</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 p-2">
                  <ShieldCheck size={18} className="text-blue-600" />
                  <span>100% Original</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;