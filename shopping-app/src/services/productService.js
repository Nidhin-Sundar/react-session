import axios from "axios";

// Base API URL
const BASE_URL = "https://dummyjson.com";

// 1. Get all products
export const getProducts = async (limit = 100) => {
  const response = await axios.get(`${BASE_URL}/products?limit=${limit}`);
  return response.data.products.map((item) => ({
    ...item,
    image: item.thumbnail, // ensure image property exists for ProductCard
  }));
};

// 2. Get single product by id
export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return {
    ...response.data,
    image: response.data.thumbnail,
  };
};
