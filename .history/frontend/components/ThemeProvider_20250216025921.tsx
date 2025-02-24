"use client";

import * as React from "react";
import useThem

const useTheme = (): UseThemeProps => {
  // Implement your theme logic here
  return {
    theme: "light", // Example default theme
    setTheme: (theme: string) => {
      console.log(`Theme changed to: ${theme}`);
    },
  };
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a ThemeContext
const ThemeContext = React.createContext<UseThemeProps | null>(null);

// Export functions
export { ThemeProvider, useTheme };
