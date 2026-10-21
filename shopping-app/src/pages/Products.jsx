import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. API States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Filter & Sort States
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setCategory(cat);
    }
  }, [searchParams]);

  // 3. Fetch Products on Mount
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Dynamic Category Extraction from DummyJSON data
  const availableCategories = ["all", ...new Set(products.map((item) => item.category).filter(Boolean))];

  //  Filtering
  let filteredProducts = products.filter((item) => {
    // Check if title matches search input
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());

    // Check if category matches dropdown
    const matchesCategory = category === "all" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sortBy === "low-to-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-to-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (loading) {
    return <p className="py-20 text-center text-xl font-semibold text-gray-500">Loading products from DummyJSON...</p>;
  }

  if (error) {
    return <p className="py-20 text-center text-xl font-semibold text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Our Products
      </h1>

      {/* --- SIMPLE CONTROLS BAR --- */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">

        {/* 1. Search Box */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
        />

        {/* 2. Dynamic Category Filter */}
        <select
          value={category}
          onChange={(e) => {
            const nextCat = e.target.value;
            setCategory(nextCat);
            if (nextCat === "all") {
              setSearchParams({});
            } else {
              setSearchParams({ category: nextCat });
            }
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 capitalize"
        >
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat.replace("-", " ")}
            </option>
          ))}
        </select>

        {/* 3. Price Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="default">Sort by: Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>

      </div>

      {/* --- PRODUCTS GRID --- */}
      {filteredProducts.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              category={product.category}
              price={Math.round(product.price * 80)}
              oldPrice={Math.round(product.price * 80 * (1 + (product.discountPercentage || 15) / 100))}
              rating={product.rating?.rate || 4.5}
              reviews={product.rating?.count || 45}
              stock={product.stock ?? 10}
              discount={Math.round(product.discountPercentage) || 15}
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;