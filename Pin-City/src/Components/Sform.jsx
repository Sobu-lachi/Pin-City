import { useNavigate } from "react-router-dom"


function Sform(){
    const navigate = useNavigate();

    function handleSformNavigation(e){
        e.preventDefault();
        navigate('/')
    }

    return(<>
    <form action="">
                <label htmlFor="Fname">First name: </label> <br />
                <input type="text" name="" id="Fname" placeholder="Enter first name" /> <br />
                
                <label htmlFor="Lname">Last Name: </label> <br />
                <input type="text" id="Lname" placeholder="Enter last name" /> <br />
                
                <label htmlFor="email">Email address: </label> <br />
                <input type="email" name="" id="email" placeholder="Enter email address" /> <br />
                
                <label htmlFor="uname">Username: </label> <br />
                <input type="text" name="" id="uname" placeholder="Enter username"/> <br />
                
                <label htmlFor="password">Password: </label> <br />
                <input type="password" name="" id="password" placeholder="Enter password"/> <br />
                
                <label htmlFor="Cpassword">Confirm Password: </label> <br />
                <input type="password" id="Cpassword" placeholder="Re-enter password"/> <br />
                
                <button type="button" onClick={handleSformNavigation} >Create Account</button>
                
                
            </form>
    </>)
}

export default Sform