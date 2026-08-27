import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { MoonIcon, ArrowRightStartOnRectangleIcon, RectangleStackIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; 
import { useTheme} from './ThemeContext.jsx';
import logo from '../assets/logo.png'
import api from './api.js'

function Dashboard(){
    const [isMenuOpen, setIsMenuOpen] = useState(false)  
    const [usersName, setUsersName] = useState('');
    const navigate = useNavigate();
    const {setBodyColor} = useTheme();
    
    const [pin, setPin] = useState('*****')
    
    useEffect(()=>{
        setBodyColor('#E2E8F0')
    },[setBodyColor])

    function handleHamburger(){
        setIsMenuOpen(m => !m);
    }

    function handlePinNavigaton(){
        navigate('/PinHistory');
        setIsMenuOpen(false); 
    }

    async function logout(){
        try{
            await api.post('/logout');
            navigate('/')
        }catch(e){
            console.log(e)
        }
    }

    async function pinGeneration() {
        try {
            const response = await api.post('/generate-pin');
            setPin(response.data.pin)
        } catch (e) {
            if (e.response?.status === 409) {
                setPin(e.response.data.pin);
            }
            console.log(e.response?.data?.message || e.message)
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
          } catch (e) {
            console.error(`${e}: User is logged out.`);
          }
        }
        loadData()
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-[#0F172A]">
            
            {/* Top Navigation Bar */}
            <header className="bg-white shadow-sm flex justify-between items-center px-4 md:px-8 py-2 md:ml-64 transition-all duration-300">
                <div className="flex items-center gap-3">
                    <button onClick={handleHamburger} className="md:hidden p-1 hover:bg-gray-100 rounded-md">
                        <Bars3Icon className="size-6 text-gray-700" />
                    </button>
                    <h1 className="font-bold font-[montserrat] text-base md:text-4 truncate">Hi, {usersName || 'User'}</h1>
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoonIcon className="text-indigo-600 size-6"/>
                </button>
            </header>

            
            {isMenuOpen && (
                <div 
                    onClick={handleHamburger} 
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
                />
            )}

            {/* Navigation Sidebar*/}
            <aside className={`fixed top-0 left-0 h-screen bg-[#0F172A] text-white w-64 z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <div>
                    
                    <div className="flex items-center justify-between mt-2 mb-10">
                        <div className="flex items-center gap-3">
                            <img className="w-8 h-8 object-contain" src={logo} alt="logo" />
                            <span className="font-bold font-[montserrat] text-md tracking-wide">Pincity</span>
                        </div>
                        {/* Mobile Close Button */}
                        <button onClick={handleHamburger} className="md:hidden p-1 hover:bg-slate-800 rounded-md">
                            <XMarkIcon className="size-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-2">
                        <button 
                            onClick={handlePinNavigaton}
                            className="w-full rounded-lg bg-[#5B4CDB]/20 border-l-4 border-[#5B4CDB] py-2 px-4 text-xs text-white flex items-center gap-3 hover:bg-[#5B4CDB]/30 transition-all text-left"
                        >
                            <RectangleStackIcon className="size-5 text-gray-300/50"/>
                            <span>Pin History</span>
                        </button>
                    </nav>
                </div>

                {/* Sidebar Footer Action */}
                <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-sm text-gray-300">
                    <span>Logout</span>
                    <button 
                        onClick={logout}
                        className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                        aria-label="Logout"
                    >
                        <ArrowRightStartOnRectangleIcon className="size-5"/>
                    </button>
                </div>
            </aside>

            {/* Central Main Dashboard Content Area */}
            <main className="md:ml-64 p-4 md:p-8 flex items-center justify-center min-h-[calc(100vh-73px)]">
                <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg shadow-black/30 border border-gray-100 p-8 md:p-12 flex flex-col items-center justify-center text-center gap-8 transition-all">
                    
                    <div className="space-y-2">
                        <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest font-[montserrat]">Your Secure Token</h2>
                        <p className="font-[montserrat] text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-slate-800 break-all select-all selection:bg-indigo-100">
                            {pin}
                        </p> 
                    </div>

                    <button 
                        className="bg-[#5B4CDB] hover:bg-[#4a3bc2] active:scale-98 text-white py-3.5 px-8 rounded-full font-[montserrat] font-medium tracking-wide shadow-md shadow-indigo-600/20 transition-all cursor-pointer w-full sm:w-auto"
                        onClick={pinGeneration}
                    >
                        Get Your Pin
                    </button> 
                </div>
            </main>
        </div>
    )
}

export default Dashboard
