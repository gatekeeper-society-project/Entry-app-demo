import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activePlan, setActivePlan] = useState(null); 
  const [qrCount, setQrCount] = useState(0); // <--- Make sure this line is here

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const colors = {
    isDarkTheme,
    background: isDarkTheme ? '#121214' : '#F9F9FC',
    cardBackground: isDarkTheme ? '#1A1A1E' : '#FFFFFF',
    cardBorder: isDarkTheme ? '#2D2D34' : '#D3CDE6',
    primaryText: isDarkTheme ? '#E2E8F0' : '#4A3B70',
    secondaryText: isDarkTheme ? '#A0AEC0' : '#6A5B8C',
    subtext: isDarkTheme ? '#718096' : '#CBD5E0',
    headerTitle: isDarkTheme ? '#A0AEC0' : '#6C7A89',
    sectionHeading: isDarkTheme ? '#F7FAFC' : '#2D3748',
    itemLabel: isDarkTheme ? '#CBD5E0' : '#A0AEC0',
    tabBarActive: isDarkTheme ? '#9F85FF' : '#3B2A60',
    tabBarInactive: isDarkTheme ? '#4A4A52' : '#7A869A',
    tabBarBackground: isDarkTheme ? '#1A1A1E' : '#F9FBFB',
    tabBarBorder: isDarkTheme ? '#2D2D34' : '#E2E8F0',
  };

  return (
    // CRITICAL: BOTH qrCount and setQrCount must be in this value list
    <ThemeContext.Provider value={{ colors, toggleTheme, activePlan, setActivePlan, qrCount, setQrCount }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);