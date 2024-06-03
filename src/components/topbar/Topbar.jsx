import React,{useContext} from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext/AuthContext'
import { UserContext } from '../../context/userContext/UserContext'
import { logout } from '../../context/authContext/apiCalls'
export default function Topbar() {
  const {user,dispatch} = useContext(AuthContext); //from AuthContext(Login account)
  const {users} = useContext(UserContext) //from UserContext(List accounts)

  const UserAfterUpdateFromList = users.find((id)=>id._id===user._id)

  const handleLogout=(e)=>{
    e.preventDefault();
    logout(dispatch)//מעביר את ה EMAIL AND PASSWORD , DISPATCH הפונקצייה מ AUTHCONTEXT
}

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo" onClick={handleLogout}>Admin panel</span>
        </div>
        <div className="topRight">
       <Link to={{pathname: "/user/"+user._id, user: user}}>
          <img src={UserAfterUpdateFromList?.profilePic||user.profilePic||"https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"} alt="" className="topAvatar" />
        </Link>
        </div>
      </div>
    </div>
  );
}
