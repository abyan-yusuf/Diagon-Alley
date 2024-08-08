import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import Private from "./Routes/DashboardRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminRoute from "./Routes/AdminRoute";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";
import Profile from "./Pages/Dashboard/UserDashboard/Profile";
import Orders from "./Pages/Dashboard/UserDashboard/Orders";
import AdminProducts from "./Pages/Dashboard/AdminDashboard/AdminProducts";
import UpdateProduct from "./Pages/Dashboard/AdminDashboard/UpdateProduct";
import CreateProduct from "./Pages/Dashboard/AdminDashboard/CreateProduct";
import AdminUsers from "./Pages/Dashboard/AdminDashboard/AdminUsers";
import AdminCategories from "./Pages/Dashboard/AdminDashboard/AdminCategories";
import SearchResults from "./Pages/SearchResults";
import ProductDetails from "./Pages/ProductDetails";
import CategoryProducts from "./Pages/CategoryProducts";
import Cart from "./Pages/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/details/:id" element={<ProductDetails />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Private />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/manage-category" element={<AdminCategories />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:id" element={<UpdateProduct />} />
        <Route path="admin/manage-product" element={<AdminProducts />} />
        <Route path="admin/all-users" element={<AdminUsers />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/category/:cid" element={<CategoryProducts />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
