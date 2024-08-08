"use client";
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface ThemeContextState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
