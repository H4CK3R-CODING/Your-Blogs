import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </RecoilRoot>
  </StrictMode>
);
