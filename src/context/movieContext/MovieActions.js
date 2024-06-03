export const getMoviesStart =()=>({
    type:"GET_MOVIES_START"//מפעיל את הREDUCER CASE
})
export const getMoviesSuccess =(movies)=>({
    type:"GET_MOVIES_SUCCESS",
    payload:[...movies]
})
export const getMoviesFail =()=>({
    type:"GET_MOVIES_FAILURE"
})
export const createMovieStart =()=>({
    type:"CREATE_MOVIE_START"//מפעיל את הREDUCER CASE
})
export const createMovieSuccess =(movie)=>({
    type:"CREATE_MOVIE_SUCCESS",
    payload:movie
})
export const createMovieFailure =()=>({
    type:"CREATE_MOVIE_FAILURE"
})
export const updateMovieStart =()=>({
    type:"UPDATE_MOVIE_START"//מפעיל את הREDUCER CASE
})
export const updateMovieSuccess =(movie)=>({
    type:"UPDATE_MOVIE_SUCCESS",
    payload:movie
})
export const updateMovieFailure =()=>({
    type:"UPDATE_MOVIE_FAILURE"
})
export const deleteMovieStart =()=>({
    type:"DELETE_MOVIE_START"
})
export const deleteMovieSuccess =(id)=>({
    type:"DELETE_MOVIE_SUCCESS",
    payload:id,
})
export const deleteMovieFailure =()=>({
    type:"DELETE_MOVIE_FAILURE"
})