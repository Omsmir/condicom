"use client"
import { useTheme } from 'next-themes';
import { Moon,Sun } from 'lucide-react';
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={handleTheme}
      className="p-1"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeToggle;