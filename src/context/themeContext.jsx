import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  // State untuk warna tema (green, blue, purple, dll)
  const [theme, setTheme] = useState({ name: "theme-green", color: "#299D91" });

  // State untuk dark/light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Cek localStorage
    const saved = localStorage.getItem("isDarkMode");
    if (saved !== null) {
      return saved === "true";
    }
    // Cek preferensi sistem
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  // Simpan ke localStorage setiap kali isDarkMode berubah
  useEffect(() => {
    localStorage.setItem("isDarkMode", String(isDarkMode));
    
    // Tambahkan/remove class 'dark' ke html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDarkMode, 
      toggleDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};