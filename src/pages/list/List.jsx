import { Link, Redirect, useHistory } from "react-router-dom";
import "./list.css";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
export default function List() {
  const { dispatch } = useContext(ListContext);
  const history = useHistory();
  const location = useLocation();
  const list = location.list;
  const [mylist, setMylist] = useState(list);

  if(!list){
    return <Redirect to={"/lists"}></Redirect>
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    updateList(mylist, dispatch);
    history.push("/lists");
  };
console.log(mylist)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List title</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              placeholder={list.title}
              onChange={(e) => {
                setMylist({ ...mylist, title: e.target.value });
              }}
            />
            <label>type</label>
            <select
              name="type"
              id="type"
              onChange={(e) => setMylist({ ...mylist, type: e.target.value })}
              style={{ padding: "5px" }}
            >
              <option value="" placeholder="type">
                Choose type
              </option>
              <option value="series">Series</option>
              <option value="movie">Movies</option>
            </select>
            <label>Genre</label>
            <select
              name="genre"
              id="genre"
              onChange={(e) => setMylist({ ...mylist, genre: e.target.value })}
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
