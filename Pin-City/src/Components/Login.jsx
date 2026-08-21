import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useTheme} from './ThemeContext.jsx';
import leftimg from '../assets/left-visual.png'
import logo from '../assets/logo.png'
import api from './api.js';
// import '../ComCSS/Login.css'

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setBodyColor, setBodyImage} = useTheme()

    useEffect(()=>{
        // setBodyColor('#626891');    
        setBodyColor('#dadfff');    
    
        // setBodyImage(`${BgImg}`)

    },[setBodyColor, setBodyImage])

    async function handleLogin(e){
        e.preventDefault();
        if (!email.trim()|| !password.trim()){
            alert('Please fill in values');
            return;
        }

        try{
           await api.post('/Login', {
                email, password
            })
            
            setPassword('');
            setEmail('');
            navigate('/Dashboard');

        }catch(error){
            console.error(error)
        }


    }


    //CSS VARIABLES
    const inputStyle = `my-2 h-8 w-70 rounded-lg  p-2 text-black outline-none transition-all duration-200
             focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 shadow-xs
             shadow-black/50 `;

    

    return(  
        <div className='h-dvh grid grid-cols-1 md:grid-cols-2 
        bg-white gap-1'>

            <img className='h-dvh w-dvw scale-x-[-1]' src={leftimg} alt="" srcset="" />
        

        <div className=' flex flex-col shadow-lg shadow-black
        bg-linear-to-br from-[#4F46E5]/20 to-white' >
            <div className='flex m-3'>
                <img className='w-8' src={logo} alt="logo" srcset="" />
                <p className='mt-1 ml-3 font-bold font-[montserrat]'>Pincity</p>
            </div>

            <form className={`absolute top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-2xl p-5 pt-0 h-100
                w-80 flex self-center justify-center flex-col shadow-lg shadow-black/50 text-sm`} onSubmit={handleLogin} >
                    <h1 className='font-medium font-[montserrat] text-3xl mb-5'>Welcome Back</h1>
                    <label htmlFor="uname" >Email address:

                   <input className={inputStyle} type="email" name="" id="uname" value={email} 
                   onChange={e=>{
                    setEmail(e.target.value)}}/>
                </label>
                    <p className='text-red-500'>Incorrect Password</p>

                <label htmlFor="password">Password:
                    <br />
                    <input className={inputStyle}
                    type="password" name="" id="password" value={password} onChange= {e=>{
                        setPassword(e.target.value)}}/>
                </label> 

                <button className='bg-[#4F46E5] text-white border border-gray-500 mt-6 rounded-sm w-20 self-center p-1' type="submit">Login</button> <br />
                <span className='self-center'>
                    Don't have an account <Link className='text-red-600' to= '/SignUp'>SignUp</Link>
                </span>
            </form>
            
        </div>
        </div> 
    )
}

export default Login