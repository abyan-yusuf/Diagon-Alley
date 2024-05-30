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
import CreateCategory from "./Pages/Dashboard/AdminDashboard/CreateCategory";
import CreateProduct from "./Pages/Dashboard/AdminDashboard/CreateProduct";
import AllUsers from "./Pages/Dashboard/AdminDashboard/AllUsers";
import Profile from "./Pages/Dashboard/UserDashboard/Profile";
import Orders from "./Pages/Dashboard/UserDashboard/Orders";

const App = () => {
  return (
    <Routes>
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
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/all-users" element={<AllUsers />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;