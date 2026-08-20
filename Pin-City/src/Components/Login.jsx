import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext.jsx';
import api from './api.js';
import '../ComCSS/Login.css'

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setBodyColor} = useTheme()

    useEffect(()=>{
        setBodyColor('#fffada')    
    },[setBodyColor])

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

    

    return(  
        <div className='form-div'>
            <form className= 'form' onSubmit={handleLogin}>
                <label htmlFor="uname" >Email address:
                   <br /> <input type="email" name="" id="uname" value={email} onChange={e=>{
                    setEmail(e.target.value)
                }}/>
                </label>

                <label htmlFor="password">Password:
                     <br />
                <input
                type="password" name="" id="password" value={password} onChange= {e=>{
                    setPassword(e.target.value)}}/>
                    </label>

                <button className='button' type="submit">Login</button>
                
            </form>
            <div className='span-div'>
                <span>
                    Don't have an account <Link to= '/SignUp'>SignUp</Link>
                </span>
            </div>
        </div>
        
    )
}

export default Login