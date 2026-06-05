import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";


// ======================================
// ➤ ADD PROPERTY (FIXED)
// ======================================
export const addProperty = async (propertyData) => {
  try {
    const docRef = await addDoc(collection(db, "properties"), {
      ...propertyData,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.log("Error adding property:", error);
    throw error;
  }
};


// ======================================
// ➤ GET FIRST 6 PROPERTIES
// ======================================
export const getInitialProperties = async () => {
  try {
    const q = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      limit(6)
    );

    const snapshot = await getDocs(q);

    const lastDoc =
      snapshot.docs.length > 0
        ? snapshot.docs[snapshot.docs.length - 1]
        : null;

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data, lastDoc };
  } catch (error) {
    console.log("Error fetching initial properties:", error);
    return { data: [], lastDoc: null };
  }
};


// ======================================
// ➤ GET MORE PROPERTIES (LOAD MORE)
// ======================================
export const getMoreProperties = async (lastDoc) => {
  try {
    if (!lastDoc) return { data: [], lastDoc: null };

    const q = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(6)
    );

    const snapshot = await getDocs(q);

    const newLastDoc =
      snapshot.docs.length > 0
        ? snapshot.docs[snapshot.docs.length - 1]
        : null;

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data, lastDoc: newLastDoc };
  } catch (error) {
    console.log("Error fetching more properties:", error);
    return { data: [], lastDoc: null };
  }
};