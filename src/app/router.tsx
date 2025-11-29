// import React from "react";
import { createBrowserRouter } from "react-router-dom";

import  Layout   from "./shell/Layout";
import CatalogPage from "@/features/catalog/CatalogPage";
import ProductPage from "@/features/product/ProductPage";
import CartPage from "@/features/cart/CartPage";
import CheckoutPage from "@/features/checkout/CheckoutPage";


export const router = createBrowserRouter([
  { path: "/", element: <Layout/>, children: [
    { path: "/", element: <Layout/> },
    { index: true, element: <CatalogPage /> },
    { path: "products/:id", element: <ProductPage /> },
    { path: "cart", element: <CartPage /> },
    { path: "checkout", element: <CheckoutPage /> },
  ]}
]);
