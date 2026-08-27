// import { useNavigate, Link } from "react-router-dom";
// import { useRef, useState } from "react";
// import api from "./api.js";
// import leftimg from '../assets/left-visual.png'
// import logo from '../assets/logo.png'



// function SignUp(){
//     const navigate = useNavigate();
//     const [fName, setFname] = useState('');
//     const [lName, setLname] = useState('');
//     const [email, setEmail] = useState('');
//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const timer = useRef(null)



//     async function handleFormSubmission(e){
//         e.preventDefault();

//         if (timer.current) {
//       clearTimeout(timer.current);
//     }

//         if (!fName.trim()||!lName.trim()||!email.trim()||
//         !userName.trim()||!password.trim()||!confirmPassword.trim()){
//             setErrorMessage('Please fill in all needed data')
//             timer.current = setTimeout(()=>{
//                 setErrorMessage('')
//             }, 4000)
//             return;
//         }

//         if (password.trim() !== confirmPassword.trim()){
//             setErrorMessage('Password mis-match');
//             timer.current = setTimeout(()=>{
//                 setErrorMessage('')
//             }, 4000)
//             return;
//         }

//         try{
//             // eslint-disable-next-line no-unused-vars
//             const response = await api.post('http://localhost:8000/SignUp', {
//                 fName, lName, email, userName, password, confirmPassword
//             })
//             // const token = response.data.token;
//             // localStorage('userToken', token)
//             // console.log(response.data);
//             setFname('');
//             setLname('');
//             setEmail('');
//             setUserName('');
//             setPassword('');
//             setConfirmPassword('');

//             navigate('/');
//         }catch(e){
//             setErrorMessage(e.response.data.message);
//             timer.current = setTimeout(()=>{
//                 setErrorMessage('')
//             }, 4000)
//         }

//     }

//     //  Css styles
//     const input = `mt-1 h-8 w-full max-w-xs rounded-lg  p-2 text-black outline-none transition-all duration-200
//              focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 shadow-xs
//              shadow-black/50`;

//     const formStyle = `flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-0  bg-white backdrop-blur-sm rounded-2xl p-4
//     pt-10 md:h-100 md:w-full shadow-lg shadow-black/50 text-sm m-3 md:m-0`;

//     return(
//     <div className ='screen'>        
//         <div className="relative min-h-screen w-full flex flex-col items-center justify-center md:shadow-lg md:shadow-black gap-8 
//         bg-linear-to-bl from-[#4F46E5]/30 to-white">
        
//         <div className='absolute top-4 left-4 transition-all duration-200 flex m-3'>
//             <img className='w-8' src={logo} alt="logo"  />
//             <p className='mt-1 ml-3 font-[montserrat] font-semibold'>Pincity</p>
//         </div>
//         {/* </div> */}

//         <form className={formStyle}
//         action="" method="" onSubmit={handleFormSubmission}>
//                 <div><label htmlFor="Fname">First name: </label>
//                 <input className={input} type="text" name="" id="Fname" placeholder="Enter first name" 
//                     value={fName} onChange={(e)=>{
//                         setFname(e.target.value)
//                     }}
//                 /></div>
                
//                 <div><label htmlFor="Lname">Last Name: </label>
//                 <input className={input} type="text" id="Lname" placeholder="Enter last name" 
//                     value={lName} onChange={(e)=>{
//                         setLname(e.target.value)
//                     }}
//                 /></div>
                
//                 <div><label htmlFor="email">Email address: </label>
//                 <input className={input}  type="email" name="" id="email" placeholder="Enter email address" 
//                     value={email} onChange={(e)=>{
//                         setEmail(e.target.value)
//                     }}
//                 /></div>
                
//                 <div><label htmlFor="uname">Username: </label>
//                 <input className={input} type="text" name="" id="uname" placeholder="Enter username"
//                     value={userName} onChange={(e)=>{
//                         setUserName(e.target.value)
//                     }}
//                 /></div>
                
//                 <div><label htmlFor="password">Password: </label>
//                 <input className={input} type="password" name="" id="password" placeholder="Enter password"
//                     value={password} onChange={(e)=>{
//                         setPassword(e.target.value)
//                     }}
//                 /></div>
                
//                 <div><label htmlFor="Cpassword">Confirm Password: </label>
//                 <input className={input} type="password" id="Cpassword" placeholder="Re-enter password"
//                     value={confirmPassword} onChange={(e)=>{
//                         setConfirmPassword(e.target.value)
//                     }}
//                 /> </div>
//                 <span className="m-0 flex self-center gap-1 order-3 md:block md:self-auto md:mt-7 md:order-0">Already have an account  <Link className ="text-red-500" to='/'> Sign in</Link>
//             </span>
                
//                 <button className="mt-0 order-2 md:order-0 bg-[#4F46E5] text-white border border-gray-500  rounded-sm w-32 self-center p-1" type="submit">Create Account</button>
                
//                 {/* absolute bottom-18  */}
//                 <div className={`md:col-span-2 flex items-center md:justify-center transition-all duration-200 h-6 md:h-1 text-red-500 font-medium order-1 md:order-none ${errorMessage ? 'visible opacity-100 scale-100': 'invisible opacity-0 scale-95'}`}>
//                     {errorMessage && (<p>{errorMessage}</p>)}
//                 </div>
            
                
//             </form>
//             </div>
//             <div className='hidden md:block md:h-dvh md:w-dvw' >
//                 <img className=' h-full w-full object-cover scale-x-[-1]' src={leftimg} alt="" />
//             </div>
//     </div>
//     )
// }

// export default SignUp


import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import api from "./api.js";
import leftimg from '../assets/left-visual.png'
import logo from '../assets/logo.png'

function SignUp() {
    const navigate = useNavigate();
    const [fName, setFname] = useState('');
    const [lName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const timer = useRef(null);

    async function handleFormSubmission(e) {
        e.preventDefault();

        if (timer.current) {
            clearTimeout(timer.current);
        }

        if (!fName.trim() || !lName.trim() || !email.trim() ||
            !userName.trim() || !password.trim() || !confirmPassword.trim()) {
            setErrorMessage('Please fill in all needed data');
            timer.current = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return;
        }

        if (password.trim() !== confirmPassword.trim()) {
            setErrorMessage('Password mis-match');
            timer.current = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
            return;
        }

        try {
            await api.post('/SignUp', {
                fName, lName, email, userName, password, confirmPassword
            });
            setFname('');
            setLname('');
            setEmail('');
            setUserName('');
            setPassword('');
            setConfirmPassword('');
            navigate('/');
        } catch (e) {
            setErrorMessage(e.response?.data?.message || "An error occurred");
            timer.current = setTimeout(() => {
                setErrorMessage('');
            }, 4000);
        }
    }

    // Modernized Tailwind utility classes
    const input = `mt-1 h-9 w-full rounded-lg border border-gray-200 p-2 text-black outline-none transition-all duration-200
             focus:ring-2 focus:ring-indigo-600 focus:border-transparent shadow-xs shadow-black/30`;

    const formStyle = `grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-4 bg-white/90 backdrop-blur-xs rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-xl border border-gray-100 text-sm`;

    return (
        // Split Layout Container
        <div className="min-h-screen w-full flex flex-col md:flex-row overflow-x-hidden bg-gray-50">
            
            {/* Left Side: Visual Image Asset */}
            <div className="hidden md:block md:w-1/2 lg:w-5/12 h-screen sticky top-0 bg-indigo-900">
                <img className="h-full w-full object-cover scale-x-[-1]" src={leftimg} alt="Sign up visual banner" />
            </div>

            {/* Right Side: Interactive Form Container */}
            <div className="relative min-h-screen w-full md:w-1/2 lg:w-7/12 flex flex-col items-center justify-center p-4 sm:p-8 bg-linear-to-bl from-[#4F46E5]/30 via-[#4F46E5]/20 to-white">
                
                {/* Absolute Corner Logo Utility */}
                <div className="absolute top-6 left-6 flex items-center transition-all duration-200">
                    <img className="w-8 h-8 object-contain" src={logo} alt="Pincity logo" />
                    <p className="ml-3 font-semibold text-gray-900 tracking-wide">Pincity</p>
                </div>

                {/* Main Action Form Box */}
                <form className={formStyle} onSubmit={handleFormSubmission}>
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700" htmlFor="Fname">First name</label>
                        <input className={input} type="text" id="Fname" placeholder="John" value={fName} onChange={(e) => setFname(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700" htmlFor="Lname">Last name</label>
                        <input className={input} type="text" id="Lname" placeholder="Doe" value={lName} onChange={(e) => setLname(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700" htmlFor="email">Email address</label>
                        <input className={input} type="email" id="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700" htmlFor="uname">Username</label>
                        <input className={input} type="text" id="uname" placeholder="johndoe" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700" htmlFor="password">Password</label>
                        <input className={input} type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700" htmlFor="Cpassword">Confirm Password</label>
                        <input className={input} type="password" id="Cpassword" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {/* Bottom Action Area: Grid footer formatting */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                        <span className="text-gray-600 text-xs sm:text-sm">
                            Already have an account? <Link className="text-indigo-600 font-semibold hover:underline" to="/">Sign in</Link>
                        </span>
                        
                        <button className="w-full sm:w-auto bg-[#4F46E5] text-white hover:bg-[#3F37C9] active:scale-98 transition-all font-medium rounded-lg px-6 py-2 shadow-md shadow-indigo-600/20 cursor-pointer" type="submit">
                            Create Account
                        </button>
                    </div>
                    
                    {/* Floating Alert Messaging Layer */}
                    <div className={`md:col-span-2 flex items-center justify-center transition-all duration-300 min-h-6 text-red-500 font-semibold text-center ${errorMessage ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1'}`}>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
