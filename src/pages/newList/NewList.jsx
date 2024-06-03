import { useEffect, useState } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./newList.css";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";

export default function NewList() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);
  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };
  const handleSelect = (e) => {
    console.log(e.target.selectedOptions[0].value);
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };
  console.log(list);
  const handleSumbit = (e) => {
    e.preventDefault();
    createList(list,dispatch);
    history.push("/lists");
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="popular movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" id="type" onChange={handleChange}>
              <option value="" placeholder="type">
                Choose type
              </option>
              <option value="series">Series</option>
              <option value="movie">Movies</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <select name="genre" id="genre" onChange={handleChange}>
              <option value="" placeholder="genre">
                Choose Genre
              </option>
              <option value="adventure">Adventure</option>
              <option value="comedy">Comedy</option>
              <option value="crime">Crime</option>
              <option value="fantasy">Fantazy</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="sci-fi">Sci-fi</option>
              <option value="thriller">Thriller</option>
              <option value="western">Western</option>
              <option value="animation">Animation</option>
              <option value="drama">Drama</option>
              <option value="documentary">Documentary</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple={true}
              name="content"
              id="content"
              onChange={handleSelect}
              style={{ height: "282px" }}
            >
              {movies.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSumbit}>
          Create
        </button>
      </form>
    </div>
  );
}
