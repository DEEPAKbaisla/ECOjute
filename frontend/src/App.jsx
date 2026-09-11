import React, { lazy, Suspense, useEffect } from "react";
import "./index.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

// ✅ Home loads immediately — has your LCP banner image
import Home from "./components/Home/Home";

// ✅ Everything else lazy loaded
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const VerifyOtp = lazy(() => import("./components/VerifyOTP"));
const Signup = lazy(() => import("./components/signup/Signup"));
const Login = lazy(() => import("./components/Login"));
const BagList = lazy(() => import("./components/product/Bags"));
const Cart = lazy(() => import("./components/cart/cart"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AddBag = lazy(() => import("./pages/admin/AddBag"));
const ManageBags = lazy(() => import("./pages/admin/ManageBags"));
const EditBag = lazy(() => import("./pages/admin/EditBag"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const HeritageLoom = lazy(() => import("./components/HeritageLoom"));

// Loading fallback
import PageLoader from "./utils/Loading";

function App() {
  const { authUser } = useAuth();
  const location = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/heritage-loom" element={<HeritageLoom />} />

          <Route path="/products" element={<BagList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/login" />}
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-bag" element={<AddBag />} />
            <Route path="manage-bags" element={<ManageBags />} />
            <Route path="edit-bag/:id" element={<EditBag />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
