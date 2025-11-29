import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com",
  timeout: 10000,
});

export async function getProducts() {
  const res = await api.get("/products");
  return res.data.products;
}

export async function getProduct(id: string | number) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}
