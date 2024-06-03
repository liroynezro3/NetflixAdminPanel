import axios from "axios";
import {
  getListsStart,
  getListsSuccess,
  getListsFail,
  deleteListStart,
  deleteListFailure,
  deleteListSuccess,
  createListStart,
  createListSuccess,
  createListFailure,
  updateListStart,
  updateListSuccess,
  updateListFailure
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.get(process.env.REACT_APP_NETFLIXBACKEND +"api/lists/", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFail());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.post(process.env.REACT_APP_NETFLIXBACKEND + "api/lists", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res.data);
    alert("The List was successfully created");
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
    console.log(err);
    alert("List updated did not succeed");
  }
}; 
export const updateList = async (list, dispatch) => {
  dispatch(updateListStart); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.put(process.env.REACT_APP_NETFLIXBACKEND + `api/lists/${list._id}` , list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res.data);
    dispatch(updateListSuccess(list))
    alert("The list was successfully updated")
  } catch (err) {
    dispatch(updateListFailure());
    console.log(err);
    alert("List updated did not succeed");
  }
};
export const deleteLists = async (id, dispatch) => {
  dispatch(deleteListStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    await axios.delete(process.env.REACT_APP_NETFLIXBACKEND + "api/lists/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
    console.log("deleted");
  } catch (err) {
    dispatch(deleteListFailure());
  }
};
