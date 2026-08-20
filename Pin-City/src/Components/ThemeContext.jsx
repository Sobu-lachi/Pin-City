import { createContext, useContext, useState, useEffect } from "react";

const appThemeContext = createContext();

export function AppThemeProvider({children}){
    const [bodyColor, setBodyColor] = useState('#ffffff');

    useEffect(()=>{
         document.body.style.backgroundColor = bodyColor;
        document.body.style.transition = 'background-color 0.3s ease';
    },[bodyColor]);

    return (
        <appThemeContext.Provider value = {{setBodyColor}}>{children}</appThemeContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(appThemeContext);