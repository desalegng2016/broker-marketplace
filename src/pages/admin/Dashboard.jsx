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

  // 🔥 REAL TIME DATA
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

  // 🗑 DELETE
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "properties", id));
  };

  // ✏ EDIT
  const handleEdit = async (id) => {
    await updateDoc(doc(db, "properties", id), {
      price: Number(editPrice),
    });
    setEditId(null);
    setEditPrice("");
  };

  // 💰 STATS
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

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <h2>Total Properties</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Total Value</h2>
          <p className="text-2xl font-bold">${totalValue}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2>Most Expensive</h2>
          <p className="font-bold">{mostExpensive?.title || "None"}</p>
          <p>${mostExpensive?.price || 0}</p>
        </div>

      </div>

      {/* LIST */}
      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-xl font-bold mb-4">All Properties</h2>

        {properties.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >

            <div>
              <p className="font-bold">{item.title}</p>
              <p>${item.price}</p>
            </div>

            <div className="flex gap-2 items-center">

              {/* EDIT */}
              {editId === item.id ? (
                <>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="border p-1 w-24"
                  />
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-green-500 text-white px-2 py-1"
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
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Edit
                </button>
              )}

              {/* DELETE */}
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}