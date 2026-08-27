/* eslint-disable react-refresh/only-export-components */
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


export const useTheme = () => useContext(appThemeContext);
// export const useBackground = () => useContext(appBackgroundContext);
