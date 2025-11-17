import React, { useState, createContext, useEffect } from "react";
import "../../Styles/ThemeContext.css";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Appliquer le thème au body à chaque changement
  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      document.body.classList.remove("dark");
    }
  }, []);

  // Fonction toggle
  const toggleThemeMode = () => {
    if (theme === "light") {
      localStorage.theme = "dark";
      setTheme("dark");
      document.body.classList.add("dark");
    } else {
      localStorage.theme = "light";
      setTheme("light");
      document.body.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
