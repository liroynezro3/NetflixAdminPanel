import axios from "axios";
import { loginFailure, loginStart, loginSuccess,logoutStart} from "./AuthActions";
export const login = async (user, dispatch) => {
  dispatch(loginStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.post(process.env.REACT_APP_NETFLIXBACKEND + "api/auth/login", user);
    res.data.isAdmin && (dispatch(loginSuccess(res.data)));
  } catch (err) {
    alert(err?.response.data)
    dispatch(loginFailure());
  }
};

export const logout = async ( dispatch) => {
  dispatch(logoutStart()); 
};