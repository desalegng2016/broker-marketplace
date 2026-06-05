import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("No user logged in");
        return;
      }

      await updatePassword(user, newPassword);

      alert("Password updated successfully!");

      setNewPassword("");
      setShowModal(false);

    } catch (error) {
      console.log(error);
      alert("Failed to update password. Please login again.");
    }
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50">
        <h1 className="font-bold">Admin</h1>

        <button onClick={() => setOpen(true)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-gray-900
          text-white
          z-50
          transform
          transition-transform
          duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="font-bold text-lg">Admin</h1>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* MENU */}
        <nav className="mt-4">

          <Link
            to="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-4 hover:bg-gray-800"
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/add-product"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-4 hover:bg-gray-800"
          >
            <FaPlus />
            <span>Add Property</span>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="w-full text-left p-4 hover:bg-gray-800"
          >
            🔑 Change Password
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 hover:bg-red-600 w-full"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>

        </nav>
      </aside>

      {/* PASSWORD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-lg w-80 text-black">

            <h2 className="text-xl font-bold mb-4">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-between">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}