// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppThemeProvider } from './Components/ThemeContext.jsx'
// import { appBackgroundProvider } from './Components/ThemeContext.jsx'
import Login from './Components/Login.jsx'
import Dashboard from './Components/Dashboard.jsx'
import SignUp from './Components/SignUp.jsx'
import PinHistory from './Components/PinHistory.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  // <appBackgroundProvider>
  <AppThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/Dashboard' element = {<Dashboard/>}/>
        <Route path= '/' element={<Login/>}/>
        <Route path = '/SignUp' element={<SignUp/>}/>
        <Route path='/PinHistory' element= {<PinHistory/>}/>
      </Routes>
    </BrowserRouter>
  </AppThemeProvider>
// </appBackgroundProvider>
  // </StrictMode>
)
