// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lform from './Components/Lform.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Sform from './Components/Sform.jsx'
import PinHistory from './Components/PinHistory.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/Dashboard' element = {<Dashboard/>}/>
        <Route path= '/' element={<Lform/>}/>
        <Route path = '/Sform' element={<Sform/>}/>
        <Route path='/PinHistory' element= {<PinHistory/>}/>
      </Routes>
    </BrowserRouter>
  // </StrictMode>
)
