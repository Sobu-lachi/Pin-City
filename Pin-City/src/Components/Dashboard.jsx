
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../ComCSS/Dashboard.css'
import {FaBars} from 'react-icons/fa'
import hero from "../assets/hero.png"
import axios from 'axios'

function Dashboard(){
    const [darkMode, setDarkMode] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)  
    const navigate = useNavigate();

    function handleHamburger(){
        setIsMenuOpen(m => !m);
    }
// Not important just for checking purposes
    // useEffect(() => {
    //     console.log(isMenuOpen);
    // }, [isMenuOpen]);


    function handlePinNavigaton(e){
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


    async function fetchDashboardData() {
    try {
        // Retrieve the stored ticket
        const savedToken = localStorage.getItem('userToken');

        const response = await axios.get('http://localhost:8000/Dashboard', {
            headers: {
                // Pass it using the industry standard "Bearer <token>" format
                'Authorization': `Bearer ${savedToken}`
            }
        });
        
        console.log("Protected Data:", response.data);
    } catch (err) {
        // If the token is expired or invalid, the backend rejects it with a 401/403
        console.error("Access denied:", err.response?.status);
        navigate('/'); // Send them back to login page
    }
}

useEffect(()=>{async function fetchData() {
      try {
        await fetchDashboardData();
      } catch (error) {
        navigate('/');
      }
    };
    fetchData();
  }, [navigate])

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