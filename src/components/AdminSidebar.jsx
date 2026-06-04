import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  // 🔥 CHANGE PASSWORD
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
      alert("Failed to update password. Please re-login.");
    }
  };

  return (
    <div className={`bg-gray-900 text-white min-h-screen transition-all ${open ? "w-64" : "w-20"}`}>

      {/* HEADER */}
      <div className="flex justify-between p-4 border-b border-gray-700">
        {open && <h1 className="font-bold">Admin</h1>}
        <FaBars onClick={() => setOpen(!open)} className="cursor-pointer" />
      </div>

      {/* MENU */}
      <nav className="mt-4">

        <Link

  to="/admin/dashboard"

  className="flex items-center gap-3 p-4 hover:bg-gray-800"

>

  <FaHome />

  {open && <span>Dashboard</span>}

</Link>



<Link

  to="/admin/add-product"

  className="flex items-center gap-3 p-4 hover:bg-gray-800"

>

  <FaPlus />

  {open && <span>Add Product</span>}

</Link>

{/* 🔥 CHANGE PASSWORD */}

        <button

          onClick={() => setShowModal(true)}

          className="w-full text-left p-4 hover:bg-blue-700"

        >

          🔑 {open && "Change Password"}

        </button> 



<button

  onClick={handleLogout}

  className="flex items-center gap-3 p-4 hover:bg-red-600 w-full"

>

  <FaSignOutAlt />

  {open && <span>Logout</span>}

</button>

      </nav>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-80 text-black">

            <h2 className="text-xl font-bold mb-4">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-between">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleChangePassword}
                className="bg-blue-600 px-4 py-2 text-white"
              >
                Update
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}