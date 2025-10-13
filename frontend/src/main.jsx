
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <div className=" dark:bg-slate-800 dark:text-white ">
        <App />
      </div>
    </AuthProvider>
  </BrowserRouter>
);
