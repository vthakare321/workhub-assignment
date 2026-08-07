import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";

import "@/index.css";

import { QueryProvider } from "@/providers/QueryProvider";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
      <Toaster
        position="top-right" reverseOrder={false}/>
    </QueryProvider>
  </React.StrictMode>
);
    
