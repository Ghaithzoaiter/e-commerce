import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/globals.css";
import "@/i18n/indesx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qc = new QueryClient();
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
  <React.StrictMode >
    <QueryClientProvider client={qc} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
    
);
}