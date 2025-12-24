import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

/* -----------------------------
   Create user document if missing
----------------------------- */
export const createUserDoc = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      portfolio: [],
      watchlist: [],
      openOrders: [],
      transactions: [],
    });
  }
};

/* -----------------------------
   Load user data
----------------------------- */
export const getUserData = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

/* -----------------------------
   Save user data (SAFE MERGE)
----------------------------- */
export const saveUserData = async (uid, data) => {
  const ref = doc(db, "users", uid);
  await setDoc(ref, data, { merge: true });
};
