import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          to="/dashboard"
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2">
            📊 Dashboard
          </h2>

          <p className="text-gray-500">
            View statistics and manage your marketplace.
          </p>
        </Link>

        <Link
          to="/add-product"
          className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2">
            ➕ Add Property
          </h2>

          <p className="text-gray-500">
            Create a new property listing.
          </p>
        </Link>

      </div>

    </div>
  );
}