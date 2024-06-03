import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function WidgetSm() {

  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try{
      const res = await axios.get(process.env.REACT_APP_NETFLIXBACKEND + "api/users?new=true", {
        headers: {
          token:
            `Bearer ` + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      setNewUsers(res.data)
      console.log(res)
    }
      catch(err){
        console.log(err)
      }
    };
    getNewUsers();
  }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user,index)=>(
        <li className="widgetSmListItem" key={index}>
          <img
            src={user.profilePic||"https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <Link to="/users" style={{textDecoration:"none",color:"black"}}>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
          Display
          </button>
          </Link>
        </li>
        ))}

      </ul>
    </div>
  );
}
