
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../ComCSS/Dashboard.css'
import {FaBars} from 'react-icons/fa'
import hero from "../assets/hero.png"
// import axios from 'axios'
import api from './api.js'

function Dashboard(){
    const [darkMode, setDarkMode] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)  
    const navigate = useNavigate();

    function handleHamburger(){
        setIsMenuOpen(m => !m);
    }

    function handlePinNavigaton(){
        navigate('/PinHistory');
    }

    function handleDarkMode(){
        setDarkMode(d => !d)
    }

    useEffect(
        () => {
            document.body.className = darkMode ? "dark" : ""; 
        }, [darkMode]
    )


//     async function fetchDashboardData() {
//     try {
//         const savedToken = localStorage.getItem('accessToken');

//         const response = await axios.get('http://localhost:8000/Dashboard', {
//             headers: {
//                 'Authorization': `Bearer ${savedToken}`
//             }
//         });
        
//         console.log("Protected Data:", response.data);
//     } catch (err) {
//         console.error("Access denied:", err.response?.status);
//         navigate('/');
//     }
// }

useEffect(() => {
    // fetchDashboardData();
    async function loadData() {
      try {
        const response = await api.get('/Dashboard');
        // eslint-disable-next-line no-undef
        setData(response.data.secretData);
      } catch (e) {
        console.error(`${e}: if it gets here, the user is completely logged out.`);
      }
    }
    loadData()
}, []);

    return (
        /* Needs local storage */
        <>
        <div className='heroSection'>

            <img src={hero} alt="logo" />
            <button className='handleMenu' onClick={handleHamburger} aria-label="Open navigation menu">
                <FaBars/>
            </button>
        </div>

        {isMenuOpen &&(
            <div className='Menu'>
                <button onClick={handlePinNavigaton}>Pin History</button><br />
                <button onClick={handleDarkMode}>Theme</button>
            </div>
        )}

        <div className='bodySection'>
            <span>*****</span> <br />
            <button>Get Your Pin</button> 
        </div>
        </>
    )
}

export default Dashboard