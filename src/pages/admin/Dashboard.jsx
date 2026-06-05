import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  // REAL-TIME DATA
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "properties"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProperties(data);
    });

    return () => unsub();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    await deleteDoc(doc(db, "properties", id));
  };

  // EDIT
  const handleEdit = async (id) => {
    await updateDoc(doc(db, "properties", id), {
      price: Number(editPrice),
    });

    setEditId(null);
    setEditPrice("");
  };

  // STATS
  const total = properties.length;

  const totalValue = properties.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  const mostExpensive = properties.reduce(
    (max, p) =>
      Number(p.price || 0) > Number(max?.price || 0) ? p : max,
    null
  );

  return (
    <div className="p-4">
      {/* PAGE TITLE */}
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 mb-2">
            Total Properties
          </h2>

          <p className="text-3xl font-bold">
            {total}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 mb-2">
            Total Value
          </h2>

          <p className="text-2xl md:text-3xl font-bold break-words">
            ${totalValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-600 mb-2">
            Most Expensive
          </h2>

          <p className="font-bold text-lg">
            {mostExpensive?.title || "None"}
          </p>

          <p>
            ${Number(
              mostExpensive?.price || 0
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* PROPERTY LIST */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          All Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-gray-500">
            No properties found.
          </p>
        ) : (
          properties.map((item) => (
            <div
              key={item.id}
              className="border-b py-4"
            >
              {/* MOBILE FRIENDLY ROW */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                {/* PROPERTY INFO */}
                <div>
                  <p className="font-bold text-lg">
                    {item.title}
                  </p>

                  <p className="text-gray-600">
                    $
                    {Number(
                      item.price || 0
                    ).toLocaleString()}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2">

                  {editId === item.id ? (
                    <>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) =>
                          setEditPrice(e.target.value)
                        }
                        className="border p-2 rounded w-28"
                      />

                      <button
                        onClick={() =>
                          handleEdit(item.id)
                        }
                        className="bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setEditPrice(item.price);
                      }}
                      className="bg-blue-600 text-white px-3 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}