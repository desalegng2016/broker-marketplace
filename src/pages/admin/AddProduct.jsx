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
      alert("Please select an image");
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

      alert("Property added successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        imageFile: null,
      });

    } catch (error) {
      console.log(error);
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 md:mt-0">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
  Add Property
</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-4xl mx-auto"
      >
        <div className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            placeholder="Property Description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="file"
            onChange={(e) =>
              setFormData({
                ...formData,
                imageFile: e.target.files[0],
              })
            }
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition"
          >
            {loading ? "Uploading..." : "Add Property"}
          </button>

        </div>
      </form>
    </div>
  );
}