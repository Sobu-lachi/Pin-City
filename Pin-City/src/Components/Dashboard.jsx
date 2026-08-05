
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../ComCSS/Dashboard.css'
import {FaBars} from 'react-icons/fa'
import hero from "../assets/hero.png"

function Dashboard(){
    const [darkMode, setDarkMode] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)  
    const navigate = useNavigate();

    function handleHamburger(){
        setIsMenuOpen(m => !m);
        // console.log(isMenuOpen)
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