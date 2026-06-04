import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
          setNotFound(false);
        } else {
          setNotFound(true);
        }

      } catch (error) {
        console.log("Error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // LOADING UI (NO FLASH)
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading property...
      </div>
    );
  }

  // NOT FOUND ONLY AFTER LOADING FINISHES
  if (notFound) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-md">

        {/* IMAGE */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="md:w-1/2 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-3">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-gray-500 mb-2">
            📍 {product.location}
          </p>

          <h2 className="text-2xl text-blue-600 font-bold mb-6">
            ${product.price}
          </h2>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg w-fit">
            Contact Seller
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;