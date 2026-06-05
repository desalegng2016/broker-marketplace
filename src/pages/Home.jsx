import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getInitialProperties,
  getMoreProperties,
} from "../services/propertyService";

/**
 * Product Card
 */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{product.title}</h2>

        <p className="text-gray-500 text-sm">{product.location}</p>

        <p className="text-gray-600 text-sm mt-1">
          {product.description}
        </p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            ${product.price}
          </span>

          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Load first page (6 items)
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data, lastDoc } = await getInitialProperties();

        setProducts(data);
        setLastDoc(lastDoc);

        if (!lastDoc) setHasMore(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Load more handler
   */
  const handleLoadMore = async () => {
    if (!lastDoc) return;

    try {
      setLoadingMore(true);

      const { data, lastDoc: newLastDoc } =
        await getMoreProperties(lastDoc);

      setProducts((prev) => [...prev, ...data]);
      setLastDoc(newLastDoc);

      if (!newLastDoc) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  /**
   * Search filter
   */
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-full shadow-md"
        />
      </div>

      <h1 className="text-2xl font-bold mb-6">
        Available Properties
      </h1>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          {/* LOAD MORE */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">
          No properties found
        </div>
      )}
    </div>
  );
}