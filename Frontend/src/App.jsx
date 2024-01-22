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

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path='*' element={ <NotFound />} />
    </Routes>
  );
};

export default App;
