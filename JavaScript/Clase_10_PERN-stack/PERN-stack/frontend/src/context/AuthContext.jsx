import { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

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
    const response = await axios.post("http://localhost:3000/api/signin", data, {
      withCredentials: true
    });
    console.log(response);
    setUser(response.data);
  }

  const signup = async (data) => {
      // Lógica para registrar al usuario
      const response = await axios.post("http://localhost:3000/api/signup", data, {
        withCredentials: true
      });
      console.log(response.data);
      setUser(response.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, errors, signup, setUser, signin, }}>
      {children}
    </AuthContext.Provider>
  );
}
