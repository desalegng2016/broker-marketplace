import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const propertyRef = collection(db, "properties");

// ADD PROPERTY
export const addProperty = async (property) => {
  return await addDoc(propertyRef, property);
};

// GET PROPERTIES
export const getProperties = async () => {
  const snapshot = await getDocs(propertyRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};