import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import api from "./api.js";
import leftimg from '../assets/left-visual.png'


function SignUp(){
    const navigate = useNavigate();
    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const timer = useRef(null)



    async function handleFormSubmission(e){
        e.preventDefault();

        if (timer.current) {
      clearTimeout(timer.current);
    }

        if (!fName.trim()||!lName.trim()||!email.trim()||
        !userName.trim()||!password.trim()||!confirmPassword.trim()){
            setErrorMessage('Please fill in all needed data')
            timer.current = setTimeout(()=>{
                setErrorMessage('')
            }, 4000)
            return;
        }

        if (password.trim() !== confirmPassword.trim()){
            setErrorMessage('Password mis-match');
            timer.current = setTimeout(()=>{
                setErrorMessage('')
            }, 4000)
            return;
        }

        try{
            // eslint-disable-next-line no-unused-vars
            const response = await api.post('http://localhost:8000/SignUp', {
                fName, lName, email, userName, password, confirmPassword
            })
            // const token = response.data.token;
            // localStorage('userToken', token)
            // console.log(response.data);
            setFname('');
            setLname('');
            setEmail('');
            setUserName('');
            setPassword('');
            setConfirmPassword('');

            navigate('/');
        }catch(e){
            setErrorMessage(e.response.data.message);
            timer.current = setTimeout(()=>{
                setErrorMessage('')
            }, 4000)
        }

    }

    //  Css styles
    const input = `mt-1 h-8 w-70 rounded-lg  p-2 text-black outline-none transition-all duration-200
             focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 shadow-xs
             shadow-black/50`;

    const formStyle = `relative grid md:grid-cols-2 gap-x-4 gap-y-0 absolute top-1/2 -translate-y-1/2 bg-white backdrop-blur-sm rounded-2xl p-4 
    pt-10 h-100 w-150 self-center justify-center shadow-lg shadow-black/50 text-sm`;

    return(
    <div className ='screen'>        
        <div className="flex flex-col shadow-lg shadow-black
        bg-linear-to-bl from-[#4F46E5]/30 to-white">
            
        <form className={formStyle}
        action="" method="" onSubmit={handleFormSubmission}>
                <div><label htmlFor="Fname">First name: </label>
                <input className={input} type="text" name="" id="Fname" placeholder="Enter first name" 
                    value={fName} onChange={(e)=>{
                        setFname(e.target.value)
                    }}
                /></div>
                
                <div><label htmlFor="Lname">Last Name: </label>
                <input className={input} type="text" id="Lname" placeholder="Enter last name" 
                    value={lName} onChange={(e)=>{
                        setLname(e.target.value)
                    }}
                /></div>
                
                <div><label htmlFor="email">Email address: </label>
                <input className={input}  type="email" name="" id="email" placeholder="Enter email address" 
                    value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                /></div>
                
                <div><label htmlFor="uname">Username: </label>
                <input className={input} type="text" name="" id="uname" placeholder="Enter username"
                    value={userName} onChange={(e)=>{
                        setUserName(e.target.value)
                    }}
                /></div>
                
                <div><label htmlFor="password">Password: </label>
                <input className={input} type="password" name="" id="password" placeholder="Enter password"
                    value={password} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                /></div>
                
                <div><label htmlFor="Cpassword">Confirm Password: </label>
                <input className={input} type="password" id="Cpassword" placeholder="Re-enter password"
                    value={confirmPassword} onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}
                /> </div>
                <span className="mt-7">Already have an account  <Link className ="text-red-500" to='/'>Sign in</Link>
            </span>
                
                <button className="mt-0 bg-[#4F46E5] text-white border border-gray-500  rounded-sm w-50 self-center p-1" type="submit">Create Account</button>
                
                
                <div className={`absolute inset-0 m-auto mb-2 flex items-center justify-center transition-all duration-200 h-6 mb-1 text-red-500  p-0.5
                 w-70 rounded-sm self-center ${errorMessage ? 'visible opacity-100 scale-100': 'invisible opacity-0 scale-95'}`}>
                    {errorMessage && (<p>{errorMessage}</p>)}
                </div>
            
                
            </form>
            </div>
        <img className='h-dvh w-dvw scale-x-[-1]' src={leftimg} alt="" />

    </div>
    )
}

export default SignUp