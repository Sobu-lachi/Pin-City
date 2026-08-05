import {Link, useNavigate} from 'react-router-dom'

function Lform(){
    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();
        navigate('/Dashboard')
    }

    return(  
        <div>
            <form action="">
                <label htmlFor="uname">Username: </label> <br />
                <input type="text" name="" id="uname" /> <br />
                <label htmlFor="password">Password: </label> <br />
                <input type="text" name="" id="password" /> <br />
                <button type="button" onClick={handleLogin}>Login</button><br/>
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