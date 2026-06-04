import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-gray-500 text-sm">{product.description}</p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            ${product.price}
          </span>

          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;