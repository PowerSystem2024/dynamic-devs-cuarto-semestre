import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);

  const signin = async (data) => {
    try {
      const response = await axios.post("/signin", data);
      setUser(response.data);
      setIsAuth(true);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  }

  const signup = async (data) => {
    try {
      const response = await axios.post("/signup", data);
      setUser(response.data);
      setIsAuth(true);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signout = async () => {
    try {
      const res = await axios.post("/signout");
      setUser(null);
      setIsAuth(false);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Cookie.get("token")) {
      axios.get("/profile").then((res) => {
        setUser(res.data);
        setIsAuth(true);
      }).catch((error) => {
        setUser(null);
        setIsAuth(false);
        console.log(error);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, signup, setUser, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
