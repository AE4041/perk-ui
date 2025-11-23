import React, { createContext, useContext, useState, ReactNode } from "react";
import { themeMode } from "./themeMode";

const { lightTheme, darkTheme } = themeMode;

export type Theme = typeof lightTheme;
type ThemeMode = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    setTheme: () => { },
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [mode, setMode] = useState<ThemeMode>("light");

    const theme = mode === "light" ? lightTheme : darkTheme;

    return (
        //@ts-ignore
        <ThemeContext.Provider value={{ theme, setTheme: setMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
