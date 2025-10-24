
import React, { createContext, useState, useEffect } from "react";

export const authDataContext = createContext();

const Authcontext = ({ children }) => {
  const serverurl = "http://localhost:5000"; // backend URL
  const [user, setUser] = useState(null);

  // Refresh ke baad localStorage se user wapas load kare
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login ke baad call karo
  const loginUser = (userData) => {
    setUser(userData); // object with firstName, lastName, email, profilePic
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout ke time sab clear karo
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <authDataContext.Provider value={{ serverurl, user, loginUser, logoutUser }}>
      {children}
    </authDataContext.Provider>
  );
};

export default Authcontext;
