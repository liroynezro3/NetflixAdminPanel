import {
  CalendarToday,
  MailOutline,
  AccountBox,
} from "@material-ui/icons";
import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { updateUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import { useContext } from "react";
export default function User() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({});
  const { dispatch } = useContext(UserContext);
  const location = useLocation();
  const user = location.user;
console.log(user)
  if (!user) {
    return <Redirect to={"/users"}></Redirect>;
  }
  const newUserUpdate = { _id: user._id };
  Object.keys(userDetails).forEach((key) => {
    if (userDetails[key]?.trim()?.length) newUserUpdate[key] = userDetails[key];
  });

  console.log(newUserUpdate);
  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(newUserUpdate, dispatch);
    history.push("/users");
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <AccountBox className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.isAdmin ? "Admin account" : "Normal user account"}
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.updatedAt}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label
                  style={{ fontSize: "24px", backgroundColor: "lightgrey" }}
                >
                  {user.email}
                </label>
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="text"
                  placeholder="*********"
                  className="userUpdateInput"
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>
                  Profile url <picture></picture>
                </label>
                <input
                  type="text"
                  placeholder={user.profilePic}
                  className="userUpdateInput"
                  onChange={(e) => {
                    setUserDetails({
                      ...userDetails,
                      profilePic: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Is Admin?</label>
                <select
                  onChange={(e) => {
                    setUserDetails({ ...userDetails, isAdmin: e.target.value });
                  }}
                >
                  <option value="" placeholder="genre">
                    Select
                  </option>
                  <option value="true">yes</option>
                  <option value="false">no</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload"></div>
              <button className="userUpdateButton" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
