import axios from "axios";
import {
  getMoviesStart,
  getMoviesFail,
  getMoviesSuccess,
  createMovieStart,
  createMovieSuccess,
  createMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieFailure,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.get(process.env.REACT_APP_NETFLIXBACKEND + "api/movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFail());
  }
};
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart()); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.post(process.env.REACT_APP_NETFLIXBACKEND + "api/movies" , movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    if (!res.ok) {
      throw new Error(res.keyValue.title);
    }
    dispatch(createMovieSuccess(movie));
    alert("The movie was successfully created")
    window.location.href = "/movies";
  } catch (err) {
    dispatch(createMovieFailure());
    console.log(err?.response?.data?.keyValue);
  }
};
export const updateMovie = async (movie, dispatch) => {
  dispatch(updateMovieStart); //מפעיל את הפונקייה ב AUTH ACTIONS
  try {
    const res = await axios.put(process.env.REACT_APP_NETFLIXBACKEND + `api/movies/${movie._id}` , movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    console.log(res.data);
    dispatch(updateMovieSuccess(movie))
    alert("The movie was successfully updated")
  } catch (err) {
    dispatch(updateMovieFailure());
    console.log(err);
    alert("Movie updated did not succeed");
  }
};
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart()); //מפעיל את הפונקייה ב AUTH ACTIONS

  try {
    await axios.delete(process.env.REACT_APP_NETFLIXBACKEND + "api/movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};
