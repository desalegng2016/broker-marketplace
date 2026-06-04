import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* LEFT: Logo + Name */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Ashu Broker Logo"
          className="w-8 h-8 object-cover"
        />
        <Link to="/" className="text-xl font-bold text-blue-600">
          Ashu Delala
        </Link>
      </div>

      {/* RIGHT: Links */}
      <div className="space-x-6">
        <a href="#" className="text-gray-700 hover:text-blue-600">
          About
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Contact Us
        </a>
        {/* <a
          href="/admin"
          className="text-gray-700 hover:text-blue-600"
        >
          Admin
        </a> */}
      </div>
      
    </nav>
  );
};

export default Navbar;