import React, { lazy, Suspense } from "react";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
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

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-green-700 border-t-transparent" />
        <span className="absolute text-xl font-semibold text-green-700 font-serif">
          🌿
        </span>
      </div>
      <p className="text-sm font-semibold text-[#203527] dark:text-[#a3b899] uppercase tracking-widest animate-pulse font-serif">
        EcoJute
      </p>
    </div>
  </div>
);

function App() {
  const { authUser } = useAuth();

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

          <Route
            path="/products"
            element={authUser ? <BagList /> : <Navigate to="/signup" />}
          />
          <Route
            path="/products/:id"
            element={authUser ? <ProductDetails /> : <Navigate to="/signup" />}
          />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/signup" />}
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
