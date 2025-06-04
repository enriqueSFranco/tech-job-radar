import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import Navigation from "@/navigation";
import { store } from "@/app/store";

async function prepareMocks() {
  if (import.meta.env.MODE !== 'development') {
    return
  }
  const {worker} = await import("@/mocks/browser")
  console.log('🧑🏻‍💻 this is development mode');
  worker.start()
}

const rootEl = document.getElementById("root");

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  prepareMocks().then(() => {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
}
