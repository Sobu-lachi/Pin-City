import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Lform(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin(e){
        e.preventDefault();
        if (!email.trim()|| !password.trim()){
            alert('Please fill in values');
            return;
        }

        try{
            const response = await axios.post('http://localhost:8000/Lform', {
                email, password
            })
            const accessToken = response.data.token;
            localStorage.setItem('accessToken', accessToken);
            setPassword('');
            setEmail('');
            navigate('/Dashboard');

        }catch(error){
            console.error(error)
        }


    }

    return(  
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="uname" >Email address:</label> <br />
                <input type="email" name="" id="uname" value={email} onChange={e=>{
                    setEmail(e.target.value)
                }}/> <br />

                <label htmlFor="password">Password:</label> <br />
                <input type="password" name="" id="password" value={password} onChange= {e=>{
                    setPassword(e.target.value)}}/> <br />

                <button type="submit">Login</button>
                {/* onClick={handleLogin} */}
                {/* Come back to this */}
                {/* <hr /> */}
                {/* <span>or</span> */}
                
            </form>
            <span>
                Don't have an account <Link to= '/Sform'>SignUp</Link>
            </span>
        </div>
    )
}

export default Lform