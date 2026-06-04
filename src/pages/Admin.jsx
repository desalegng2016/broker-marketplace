import React, { useState } from "react";
import { uploadImage } from "../utils/uploadImage";
import { addProperty } from "../services/propertyService";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    imageFile: null,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      await signOut(auth);
      //alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  };

  // SUBMIT PROPERTY
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      console.log("Uploading image...");

      // 1. Upload image to imgbb
      const imageUrl = await uploadImage(formData.imageFile);

      console.log("Image uploaded:", imageUrl);

      console.log("Saving to Firebase...");

      // 2. Save to Firestore
      await addProperty({
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        image: imageUrl,
        createdAt: new Date(),
      });

      console.log("Saved to Firebase!");

      alert("Property added successfully!");

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        imageFile: null,
      });

    } catch (error) {
      console.log("ERROR:", error);
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        {/* FORM CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              rows="4"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  imageFile: e.target.files[0],
                })
              }
              className="w-full p-3 border rounded-lg"
              required
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Uploading..." : "Add Property"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}