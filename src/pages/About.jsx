import React from "react";
import logo from "../assets/logo2.png";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">

      {/* BIG LOGO */}
      <div className="flex justify-center mb-6">
        <img
          src={logo}
          alt="Ashu Delala Logo"
          className="w-40 h-40 object-contain rounded-full shadow-lg"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">
        About Us
      </h1>

      {/* TEXT */}
      <p className="text-gray-700 leading-7">
        Welcome to <b>Ashu Delala</b>. We are a real estate platform
        that helps users buy, sell, and manage properties easily.
      </p>

      <p className="text-gray-700 leading-7 mt-4">
        Our mission is to connect buyers and sellers with a simple,
        fast, and secure system powered by modern web technology.
      </p>

    </div>
  );
}