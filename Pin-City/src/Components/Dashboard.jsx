
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../ComCSS/Dashboard.css'
import { FaMoon} from 'react-icons/fa'
// import hero from "../assets/hero.png"
import { useTheme} from './ThemeContext.jsx';
import logo from '../assets/logo.png'
import api from './api.js'

function Dashboard(){
    const [darkMode, setDarkMode] = useState(false)
    // const [isMenuOpen, setIsMenuOpen] = useState(false)  
    const [usersName, setUsersName] = useState('');
    const navigate = useNavigate();
    const {setBodyColor} = useTheme();
    
        useEffect(()=>{
            setBodyColor('#E2E8F0')
    
        },[setBodyColor])


    // function handleHamburger(){
    //     setIsMenuOpen(m => !m);
    // }

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

useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/Dashboard');
        setUsersName(`${response.data.message}`)
      } catch (e) {
        console.error(`${e}: if it gets here, the user is completely logged out.`);
      }
    }
    loadData()
}, []);

    return (
        /* Needs local storage */
        <>
        <div className='bg-gray-100 shadow-sm text-[#0F172A] flex justify-between px-6 py-3 ml-50'>
            <p className='font-bold font-[montserrat] text-lg'>Hi, {usersName}</p>
            <button>
                {/* Change to svg later */}
                <FaMoon className=' text-green-300' /></button>
            {/* <button><FaSun/></button> */}

           
        </div>
        <div className='h-dvh bg-[#0F172A] text-white w-50 fixed top-0 pl-7 '>

            <div className='mt-5 mb-10 flex gap-1'>
            <img className='w-8' src={logo} alt="logo" />
            <p className='mt-1 ml-3 font-bold font-[montserrat]'>Pincity</p>
            </div>
            <div className='h-103'>
                <div className= 'rounded-lg bg-[#5B4CDB]/20 w-39 border-l-3 border-[#5B4CDB] h-8 flex items-center px-4 text-xs text-white gap-3'>
                <img src="" alt="" />
                <button onClick={handlePinNavigaton}>Pin History</button>
                </div>
            </div>
            <div className= 'w-39 h-8 flex items-center px-4 text-xs text-white gap-3'>
                <p>Logout</p>
            </div>
        </div>
{/* Still work on this */}
        <div className='rounded-lg absolute top-75 left-90 -translate-y-1/2 flex items-center justify-center flex-col
        bg-gray-100 w-180 h-100 shadow-lg'>
            <span className='font-[montserrat] text-7xl font-medium'>*****</span> <br />
            <button className='bg-[#5B4CDB] text-white p-2 px-4 rounded-3xl font-[montserrat] tracking-tight'>Get Your Pin</button> 
        </div>
        </>
    )
}

export default Dashboard