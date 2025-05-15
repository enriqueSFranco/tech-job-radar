import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Navigation from "@/navigation";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </React.StrictMode>
  );
}
