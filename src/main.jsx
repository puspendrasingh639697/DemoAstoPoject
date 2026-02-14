import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AstroProvider from "./context/astroContext.jsx";
import "./index.css";
import App from "./App.jsx";
import KundaliContextProvider from "./context/KundaliContext.jsx";
import NumerologyContextProvider from "./context/NumerologyContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AstroProvider>
    <KundaliContextProvider>
      <NumerologyContextProvider>
        <App />
      </NumerologyContextProvider>
    </KundaliContextProvider>
  </AstroProvider>
  // </StrictMode>
);
