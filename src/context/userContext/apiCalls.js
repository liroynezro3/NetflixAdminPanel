import axios from "axios";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFail,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "./UserActions";

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.get(process.env.REACT_APP_NETFLIXBACKEND +"api/users/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFail());
  }
};

export const createUser = async (user, dispatch) => {
  dispatch(createUserStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  console.log(user)
  try {
    const res = await axios.post(process.env.REACT_APP_NETFLIXBACKEND + "api/auth/registar", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res.data);
    alert("The User was successfully created");
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
    console.log(err);
    alert("User updated did not succeed");
  }
}; 
export const updateUser = async (user, dispatch) => {
  dispatch(updateUserStart); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.put(process.env.REACT_APP_NETFLIXBACKEND + `api/users/${user._id}` , user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data))
    console.log(user)
    alert("The User was successfully updated")
  } catch (err) {
    dispatch(updateUserFailure());
    console.log(err);
    alert("User updated did not succeed");
  }
};
export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUserStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    await axios.delete(process.env.REACT_APP_NETFLIXBACKEND + "api/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
    console.log("deleted");
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
