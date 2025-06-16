import { HeroUIProvider } from "@heroui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import "@/assets/global.css";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>,
);
