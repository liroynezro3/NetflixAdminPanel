import "./newUser.css";
import React from "react";
import { useState } from "react";
import axios from "axios"
import {useHistory} from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { createUser } from "../../context/userContext/apiCalls";
export default function NewUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} =useContext(UserContext);
  const history=useHistory();
  const sumbitHandler =async(e)=>{
    e.preventDefault();
  if(email.includes("@")&&email.length>5&&password.length>5&&username.length>5){
    const user ={email:email,username:username,password:password}
    createUser(user,dispatch);
    history.push("/users")
  }
else{
  alert("Please fill in correct details")}
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username*</label>
          <input type="text" placeholder="XXXXXXX" onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="XXXXXXX@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <button className="newUserButton" onClick={sumbitHandler}>Create</button>
      </form>
    </div>
  );
}
