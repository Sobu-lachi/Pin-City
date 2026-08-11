import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios  from "axios";

function Sform(){
    const navigate = useNavigate();
    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    async function handleFormSumission(e){
        e.preventDefault();
        if (!fName.trim()||!lName.trim()||!email.trim()||
        !userName.trim()||!password.trim()||!confirmPassword.trim()){
            alert('Please fill in all needed data')
            return;
        }

        if (password.trim() !== confirmPassword.trim()){
            alert('Password mis-match: re-enter password ');
            return;
        }

        try{
            const response = await axios.post('http://localhost:8000', {
                fName, lName, email, userName, password, confirmPassword
            })
            // console.log(response.data);
            setFname('');
            setLname('');
            setEmail('');
            setUserName('');
            setPassword('');
            setConfirmPassword('');

            navigate('/');
        }catch(e){
            console.error(e)
        }

    }

    return(<>
    <form action="" method="" onSubmit={handleFormSumission}>
                <label htmlFor="Fname">First name: </label> <br />
                <input type="text" name="" id="Fname" placeholder="Enter first name" 
                    value={fName} onChange={(e)=>{
                        setFname(e.target.value)
                    }}
                /> <br />
                
                <label htmlFor="Lname">Last Name: </label> <br />
                <input type="text" id="Lname" placeholder="Enter last name" 
                    value={lName} onChange={(e)=>{
                        setLname(e.target.value)
                    }}
                /> <br />
                
                <label htmlFor="email">Email address: </label> <br />
                <input type="email" name="" id="email" placeholder="Enter email address" 
                    value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                /> <br />
                
                <label htmlFor="uname">Username: </label> <br />
                <input type="text" name="" id="uname" placeholder="Enter username"
                    value={userName} onChange={(e)=>{
                        setUserName(e.target.value)
                    }}
                /> <br />
                
                <label htmlFor="password">Password: </label> <br />
                <input type="password" name="" id="password" placeholder="Enter password"
                    value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                /> <br />
                
                <label htmlFor="Cpassword">Confirm Password: </label> <br />
                <input type="password" id="Cpassword" placeholder="Re-enter password"
                    value={confirmPassword} onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}
                /> <br />
                
                <button type="submit">Create Account</button>
                
                
            </form>
    </>)
}

export default Sform