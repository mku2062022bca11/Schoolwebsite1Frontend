import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

const themes = {
  light: {
    primary: "blue-600",
    primaryHover: "blue-700",
    primaryLight: "blue-50",
    accent: "yellow-400",
    primary200: "blue-200",
  },
  dark: {
    primary: "blue-400",
    primaryHover: "blue-500",
    primaryLight: "blue-900",
    accent: "yellow-300",
    primary200: "blue-300",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
