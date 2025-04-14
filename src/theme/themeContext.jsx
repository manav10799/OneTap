import React, {createContext, useState, useEffect} from "react";
import { useColorScheme } from "@mui/joy/styles";

const themeContext = createContext({theme: "light"});

export const ThemeProvider = ({children}) => {
    const { mode, setMode } = useColorScheme();
    const [theme, switchTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        switchTheme(newTheme);
        setMode(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(()=> {
        document.documentElement.dataset.theme = theme;
        setMode(theme);
    },[theme,setMode]);

    return (
        <themeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </themeContext.Provider>
    ) 
}

export default themeContext;