import React, { useState } from "react";
import { uploadImage } from "../../utils/uploadImage";
import { addProperty } from "../../services/propertyService";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    imageFile: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageFile) {
      alert("Select image");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage(formData.imageFile);

      await addProperty({
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        image: imageUrl,
        createdAt: new Date(),
      });

      alert("Added successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        imageFile: null,
      });

    } catch (err) {
      console.log(err);
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Add Property
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border"
        />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border"
        />

        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, imageFile: e.target.files[0] })
          }
          className="w-full p-3 border"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3"
        >
          {loading ? "Uploading..." : "Add Property"}
        </button>

      </form>
    </div>
  );
}