import React from "react";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Home</h1>

      <div className="grid grid-cols-2 gap-4">

        <Link to="/admin/dashboard" className="p-6 bg-white shadow rounded">
          📊 Dashboard
        </Link>

        <Link to="/admin/add-product" className="p-6 bg-white shadow rounded">
          ➕ Add Product
        </Link>

      </div>
    </div>
  );
}