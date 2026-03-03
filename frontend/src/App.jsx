import React from "react";
import "./index.css";
import Home from "./components/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";

import Signup from "./components/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import UploadProduct from "./components/Add bags/UploadProduct";
import BagList from "./components/product/Bags";
import Cart from "./components/cart/cart";
import Login from "./components/Login";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddBag from "./pages/admin/AddBag";
import ManageBags from "./pages/admin/ManageBags";
import EditBag from "./pages/admin/EditBag";

function App() {
  const { authUser, setAuthUser } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/uploadProduct"
          element={authUser ? <UploadProduct /> : <Navigate to="/signup" />}
        />

        <Route
          path="/products"
          element={authUser ? <BagList /> : <Navigate to="/signup" />}
        />

        <Route
          path="/cart"
          element={authUser ? <Cart /> : <Navigate to="/signup" />}
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-bag" element={<AddBag />} />
          <Route path="manage-bags" element={<ManageBags />} />
          <Route path="edit-bag/:id" element={<EditBag />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
