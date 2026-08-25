
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../ComCSS/Dashboard.css'
// MapPinIcon SunIcon
import { MoonIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'; 
// import hero from "../assets/hero.png"
import { useTheme} from './ThemeContext.jsx';
import logo from '../assets/logo.png'
import api from './api.js'
// import toast, { Toaster } from 'react-hot-toast';

function Dashboard(){
    // const [darkMode, setDarkMode] = useState(false)
    // const [isMenuOpen, setIsMenuOpen] = useState(false)  
    const [usersName, setUsersName] = useState('');
    const navigate = useNavigate();
    const {setBodyColor} = useTheme();
    const [pin, setPin] = useState('*****')
    
        useEffect(()=>{
            setBodyColor('#E2E8F0')
    
        },[setBodyColor])


    // function handleHamburger(){
    //     setIsMenuOpen(m => !m);
    // }

    function handlePinNavigaton(){
        navigate('/PinHistory');
    }

    // function handleDarkMode(){
    //     setDarkMode(d => !d)
    // }

    // useEffect(
    //     () => {
    //         document.body.className = darkMode ? "dark" : ""; 
    //     }, [darkMode]
    // )

    async function logout(){
        try{
            await api.post('/logout');
            // modal asking are sure you want to logout
            navigate('/')
        }catch(e){
            console.log(e)
        }
    }

    async function pinGeneration() {
        try {
            const response = await api.post('/generate-pin');
            setPin(response.data.pin)
            // console.log("PIN RESPONSE:", response.data);

        } catch (e) {
            if (e.response?.status === 409) {
            setPin(e.response.data.pin);
        }
            console.log(e.response.data.message)
        }
    }

useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/Dashboard');
        const name = response.data.message;

        const formattedName =
            name.charAt(0).toUpperCase() +
            name.slice(1).toLowerCase();

        setUsersName(formattedName);

//         const showWelcome = () => {
//             toast('Welcome back', {
//             className: 'bg-green-300 text-white rounded-lg shadow-lg p-4 font-medium ',
//             duration: 2000,
//         });
//   };
//     showWelcome();

      } catch (e) {
        console.error(`${e}: if it gets here, the user is completely logged out.`);
      }
    }
    loadData()
}, []);

    return (
        <>
        {/* <div>
            <Toaster position='top-center'/>
        </div> */}

        {/* Needs local storage */}

        <div className='bg-gray-100 shadow-sm text-[#0F172A] flex justify-between px-6 py-3 ml-50'>
            <p className='font-bold font-[montserrat] text-lg'>Hi, {usersName}</p>
            <button>
                {/* Change to svg later */}
                <MoonIcon className='text-green-500 size-6'/>
                </button>

           
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
            <div className= 'w-39 h-8 flex items-center px-4 text-xs text-white justify-between'>
                <p>Logout</p>
                <button onClick={logout}><ArrowRightStartOnRectangleIcon className='size-5 text-gray-400'/></button>
            </div>
        </div>
{/* Still work on this */}
        <div className='rounded-lg absolute top-75 left-90 -translate-y-1/2 flex items-center justify-center flex-col
        bg-gray-100 w-180 h-100 shadow-lg'>
            <p className='font-[montserrat] text-7xl font-medium'
            >{pin}</p> <br />
            <button className='bg-[#5B4CDB] text-white p-2 px-4 rounded-3xl font-[montserrat] tracking-tight'
                onClick={pinGeneration}
            >Get Your Pin</button> 
        </div>
        </>
    )
}

export default Dashboard