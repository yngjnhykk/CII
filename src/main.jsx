import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="bg-gray-200">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </div>
);
