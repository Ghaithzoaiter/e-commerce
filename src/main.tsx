import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/globals.css";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Layout } from "./app/shell/Layout";
const qc = new QueryClient();



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
    
);
