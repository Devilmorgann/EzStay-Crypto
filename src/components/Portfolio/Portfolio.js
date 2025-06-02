// utils/portfolioStorage.js
import { db } from "../Navbar/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Save data
export const savePortfolio = async (uid, portfolio) => {
  const docRef = doc(db, "portfolios", uid);
  await setDoc(docRef, { data: portfolio });
};

// Load data
export const loadPortfolio = async (uid) => {
  const docRef = doc(db, "portfolios", uid);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data().data;
  } else {
    return [];
  }
};
