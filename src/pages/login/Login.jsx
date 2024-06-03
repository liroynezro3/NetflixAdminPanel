import React from 'react'
import { useState,useContext} from 'react'
import { AuthContext } from '../../context/authContext/AuthContext'
import { login } from '../../context/authContext/apiCalls'
import "./Login.css"
function Login() {
    const {isFetching,dispatch} = useContext(AuthContext);
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    
    const handleLogin=(e)=>{
        e.preventDefault();
        login({email,password},dispatch)//מעביר את ה EMAIL AND PASSWORD , DISPATCH הפונקצייה מ AUTHCONTEXT
    }
  return (
    <div className="login">
        <form className="loginForm">
            <div className='around'>
            <h3>email:</h3>
            <input type="text" placeholder='email' className='loginInput' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='around'>
            <h3>password:</h3>
            <input type="password" placeholder='password' className='loginInput' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button  className="loginButton" onClick={handleLogin} disabled={isFetching}>Login</button>
        </form>
    </div>
  )
}

export default Login