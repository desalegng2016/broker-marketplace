import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

import AdminLayout from "./components/AdminLayout";

import AdminHome from "./pages/admin/AdminHome";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";

import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">

      {!isAdmin && <Navbar />}

      <div className="flex-1">
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >

            <Route index element={<AdminHome />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-product" element={<AddProduct />} />

          </Route>

        </Routes>
      </div>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;