/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const appThemeContext = createContext();

export function AppThemeProvider({children}){
    const [bodyColor, setBodyColor] = useState('#ffffff');
    const [bodyImage, setBodyImage] = useState('');


    useEffect(()=>{
         document.body.style.backgroundColor = bodyColor;
        if (bodyImage){
        document.body.style.backgroundImage = `url('${bodyImage}')`;
      document.body.style.backgroundSize = '500px';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundImage = '';
    }

        document.body.style.transition = 'background-color 0.3s ease';
    },[bodyColor, bodyImage]);

    return (
        <appThemeContext.Provider value = {{setBodyColor, setBodyImage}}>{children}</appThemeContext.Provider>
    )
}


export const useTheme = () => useContext(appThemeContext);
// export const useBackground = () => useContext(appBackgroundContext);
