import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "../config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token && !user) { // Fetch user data only if not already set
      axios
        .get(`${API_BASE_URL}/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data)); // Persist user data
        })
        .catch(() => logout());
    }
  }, [token]);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    //localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user data
    setToken(data.token);
    //setUser(data.user);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ Remove user data
    setUser(null);
    setToken("");
    alert("Logout successful!"); // ✅ Success alert
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
