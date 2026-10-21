import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Headphones } from "lucide-react";
import { getProducts } from "../services/productService";

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProducts();

        // Extract unique categories with first product image & count
        const categoryMap = {};
        data.forEach((product) => {
          if (!product.category) return;
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = {
              slug: product.category,
              name: product.category.replace(/-/g, " "),
              image: product.image,
              itemCount: 1,
            };
          } else {
            categoryMap[product.category].itemCount += 1;
          }
        });

        setCategories(Object.values(categoryMap));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <div className="space-y-12">
      {/* 1. Hero Banner */}
      <section className="rounded-3xl bg-blue-600 px-8 py-16 text-center text-white md:px-12 md:text-left md:flex md:items-center md:justify-between">
        <div className="max-w-xl">
          <span className="rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Mega Sale is Live
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl leading-tight">
            Discover Quality Products at the Best Prices.
          </h1>
          <p className="mt-4 text-blue-100 text-base sm:text-lg">
            Shop the latest fashion, electronics, and beauty essentials with fast delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-gray-900 hover:bg-amber-300 transition"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-8 md:mt-0 flex justify-center">
          <div className="h-44 w-44 rounded-2xl bg-white/10 flex items-center justify-center">
            <ShoppingBag size={80} className="text-white/80" />
          </div>
        </div>
      </section>

      {/* 2. Features / Perks */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <Truck className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="font-bold text-gray-900">Free Delivery</h3>
            <p className="text-sm text-gray-500">Orders above ₹5,000</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <ShieldCheck className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="font-bold text-gray-900">Secure Payments</h3>
            <p className="text-sm text-gray-500">100% Protected checkout</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <Headphones className="h-10 w-10 text-blue-600" />
          <div>
            <h3 className="font-bold text-gray-900">24/7 Support</h3>
            <p className="text-sm text-gray-500">Dedicated assistance</p>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Browse our wide selection of handpicked collections
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            All Products <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col items-center"
              >
                <div className="h-36 w-full rounded-xl bg-gray-200 mb-4" />
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col justify-between rounded-2xl bg-white p-5 shadow-xs border border-gray-100 hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-50 p-4 flex items-center justify-center group-hover:bg-blue-50/40 transition">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-xs font-semibold text-gray-700 shadow-xs">
                    {cat.itemCount} {cat.itemCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold capitalize text-gray-900 group-hover:text-blue-600 transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Explore collection</p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. Newsletter */}
      <section className="rounded-3xl bg-gray-900 p-8 text-center text-white sm:p-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Stay Updated with Our Offers</h2>
        <p className="mt-2 text-gray-400 text-sm">Subscribe to get secret discount coupons.</p>

        {subscribed ? (
          <p className="mt-4 font-semibold text-green-400">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md mx-auto gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-xl bg-gray-800 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Home;