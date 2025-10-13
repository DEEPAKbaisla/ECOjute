import React from "react";
import "./index.css";
import Home from "./components/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";

import Signup from "./components/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import UploadProduct from "./components/Add bags/UploadProduct";
import BagList from "./components/product/Bags";


function App() {
  const [authUser, setAuthUser] = useAuth();
  // console.log(authUser);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/uploadProduct"
          element={authUser ? <UploadProduct /> : <Navigate to="/signup" />}
        />
        <Route
          path="/products"
          element={authUser ? <BagList /> : <Navigate to="/signup" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
