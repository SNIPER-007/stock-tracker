import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createUserDoc } from "../services/firestoreService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await createUserDoc(currentUser.uid);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
