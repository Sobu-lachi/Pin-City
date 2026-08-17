import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Lform(){
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin(e){
        e.preventDefault();
        if (!username.trim()|| !password.trim()){
            alert('Please fill in values');
            return;
        }

        try{
            const response = await axios('http://localhost:8000', {
                username, password
            })
            // console.log("Success from backend:", data);
            setPassword('');
            setUserName('');
            navigate('/Dashboard');

        }catch(error){
            console.error(error)
        }


    }

    return(  
        <div>
            <form method='module' action='submit' onSubmit={handleLogin}>
                <label htmlFor="uname" >Username:</label> <br />
                <input type="text" name="" id="uname" value={username} onChange={e=>{
                    setUserName(e.target.value)
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