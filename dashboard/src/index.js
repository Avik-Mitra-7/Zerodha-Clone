

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie"; // [1] Import this
import Apps from './Apps';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider> {/* [2] Wrap the entire app here */}
      <BrowserRouter>
        <Apps />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);