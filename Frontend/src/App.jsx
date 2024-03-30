import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom/dist/umd/react-router-dom.development";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import Spinner from "./Components/Loader/spinner";
import Private from "./Routes/Private";
import ForgotPassword from "./Pages/ForgotPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Private />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
