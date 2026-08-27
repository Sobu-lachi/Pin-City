import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import leftimg from '../assets/left-visual.png';
import logo from '../assets/logo.png';
import api from './api.js';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const timerRef = useRef(null);

    async function handleLogin(e) {
        e.preventDefault();

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        try {
            await api.post('/Login', { email, password });
            setPassword('');
            setEmail('');
            navigate('/Dashboard');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Invalid credentials");
            timerRef.current = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        }
    }

    // Modernized, solid utility styles
    const inputStyle = `mt-1.5 h-9 w-full rounded-lg border border-gray-200 p-2 text-black outline-none transition-all duration-200
             focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-xs shadow-black/30`;

    const formStyle = `bg-white/90 backdrop-blur-xs rounded-2xl p-6 md:p-8 w-full max-w-sm shadow-xl border border-gray-100 flex flex-col`;

    return (
        // Split Layout Container (Identical to SignUp for visual consistency)
        <div className="min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden bg-gray-50">
            
            {/* Left Side: Visual Image Asset */}
            <div className="hidden md:block md:w-1/2 lg:w-5/12 h-screen sticky top-0 bg-indigo-900">
                <img className="h-full w-full object-cover scale-x-[-1]" src={leftimg} alt="Login visual banner" />
            </div>

            {/* Right Side: Form Container Wrapper */}
            <div className="relative min-h-screen w-full md:w-1/2 lg:w-7/12 flex flex-col items-center justify-center p-4 sm:p-8 bg-linear-to-br from-[#4F46E5]/30 via-[#4F46E5]/20 to-white">
                
                {/* Fixed Corner Logo Layout */}
                <div className="absolute top-6 left-6 flex items-center transition-all duration-200">
                    <img className="w-8 h-8 object-contain" src={logo} alt="Pincity logo" />
                    <p className="ml-3 font-semibold text-gray-900 tracking-wide">Pincity</p>
                </div>

                {/* Main Interactive Form Card */}
                <form className={formStyle} onSubmit={handleLogin}>
                    <h1 className="font-semibold text-2xl text-gray-900 tracking-tight mb-6">Welcome Back</h1>
                    
                    <div className="flex flex-col mb-4">
                        <label className="font-medium text-gray-700 text-sm" htmlFor="uname">Email address</label>
                        <input 
                            className={inputStyle} 
                            type="email" 
                            id="uname" 
                            value={email} 
                            placeholder="you@example.com"
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="font-medium text-gray-700 text-sm" htmlFor="password">Password</label>
                        <input 
                            className={inputStyle} 
                            type="password" 
                            id="password" 
                            value={password} 
                            placeholder="••••••••"
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </div> 
                    
                    {/* Message Box Placeholder prevents layout shifting when error pops */}
                    <div className={`transition-all duration-300 min-h-[1.5rem] flex items-center text-red-500 font-semibold text-xs mt-1 ${errorMessage ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'}`}>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>

                    <button className="w-full bg-[#4F46E5] text-white hover:bg-[#3F37C9] active:scale-98 transition-all font-medium rounded-lg py-2 mt-4 shadow-md shadow-indigo-600/20 cursor-pointer text-sm" type="submit">
                        Login
                    </button> 
                    
                    <span className="self-center text-xs text-gray-600 mt-5">
                        Don't have an account? <Link className="text-indigo-600 font-semibold hover:underline" to="/SignUp">Sign up</Link>
                    </span>
                </form>
            </div>
        </div> 
    );
}

export default Login;
