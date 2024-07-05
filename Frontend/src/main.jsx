import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthDataProvider } from "./Api/authContext.jsx";
import { SearchDataProvider } from "./Api/searchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthDataProvider>
    <SearchDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchDataProvider>
  </AuthDataProvider>
);
