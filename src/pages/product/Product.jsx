import { Link, Redirect, useHistory } from "react-router-dom";
import "./product.css";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateMovie } from "../../context/movieContext/apiCalls";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;
  const [myMovie, setMyMovie] = useState(movie);
  const { dispatch } = useContext(MovieContext);
  const history = useHistory();

  if(!movie){
    return <Redirect to={"/movies"}></Redirect>
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    updateMovie(myMovie, dispatch);
    history.push("/movies");
  };
  console.log(myMovie);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Poster Img - use URL</label>
            <input
              type="text"
              placeholder={"Add url"}
              onChange={(e) => {
                setMyMovie({ ...myMovie, img: e.target.value });
              }}
            />
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              onChange={(e) => {
                setMyMovie({ ...myMovie, title: e.target.value });
              }}
            />
            <label>Year</label>
            <input
              type="number"
              placeholder={movie.year}
              onChange={(e) => {
                setMyMovie({ ...myMovie, year: e.target.value });
              }}
            />

            <label>Genre</label>
            <select
              name="genre"
              id="genre"
              onChange={(e) =>
                setMyMovie({ ...myMovie, genre: e.target.value })
              }
              style={{ padding: "5px" }}
            >
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
            <label>Limit</label>
            <input
              type="number"
              placeholder={movie.limit}
              onChange={(e) => {
                setMyMovie({ ...myMovie, limit: e.target.value });
              }}
            />
            <label>Movie description</label>
            <textarea
              type="text"
              placeholder={movie.desc}
              onChange={(e) => {
                setMyMovie({ ...myMovie, desc: e.target.value });
              }}
              style={{height:"80px",padding:"10px",marginBottom:"10px"}}
            />
          </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleSumbit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
