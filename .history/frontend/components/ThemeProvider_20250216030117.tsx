"use client";

import * as React from "react";
import { UseThemeProps,ThemeProviderProps } from "next-themes/dist/types";

// Create a ThemeContext with a default value
const ThemeContext = React.createContext<UseThemeProps | null>(null);

// Custom hook to use the theme
const useTheme = (): UseThemeProps => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// ThemeProvider component
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<string>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export ThemeProvider and useTheme
export { ThemeProvider, useTheme };
