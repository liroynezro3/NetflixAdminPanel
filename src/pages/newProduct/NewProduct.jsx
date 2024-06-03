import { useState } from "react";
import storage from "../../firebase";
import {ref, uploadBytesResumable,getDownloadURL} from "firebase/storage";
import "./newProduct.css";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createMovie } from "../../context/movieContext/apiCalls";
import { useHistory } from "react-router-dom";


export default function NewProduct() {
  const [movie,setMovie]=useState(null);
  const [img,setImg]=useState(null);
  const [imgTitle,setImageTitle]=useState(null);
  const [imgSm,setImgSm]=useState(null);
  const [trailer,setTrailer]=useState(null);
  const [video,setVideo]=useState(null);
  const [uploaded,setUploaded]=useState(0);
  
const {dispatch} = useContext(MovieContext)
const history = useHistory();
  const handleChange=(e)=>{
const value = e.target.value;
setMovie({...movie,[e.target.name]:value})
  }
  const upload = (items)=>{
    items.forEach(item=>{
      const fileName = new Date().getTime() + item.label;
      const storageRef = ref(storage, `/images/${fileName}`); // המיקום והשם
      const uploadTask = uploadBytesResumable(storageRef, item.file);// ההלאה עצמה לקובץ

      uploadTask.on('state_changes',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (err)=>{console.log(err)},
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMovie(prev=>{
            return {...prev,[item.label]:downloadURL}
          });
          setUploaded(prev=>prev+1)
        });
      })
    })
  }
  console.log(movie)
const handleUpload = (e) => {
e.preventDefault();
upload([
  {file:img, label:"img"},
  {file:imgTitle, label:"imgTitle"},
  {file:imgSm, label:"imgSm"},
  {file:trailer, label:"trailer"},
  {file:video, label:"video"}
]);
};
const handleSumbit =(e)=>{
  e.preventDefault();
  history.replace("/movies")
createMovie(movie,dispatch);
}
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={e=>setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle"  onChange={e=>setImageTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumble image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={e=>setImgSm(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="number" placeholder="Year" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select
            name="genre"
            id="genre"
            onChange={handleChange}
          >
            <option value="" placeholder="genre">Choose Genre</option>
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
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="number" placeholder="Limit" name="limit" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={e=>setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={e=>setVideo(e.target.files[0])}/>
        </div>
        {uploaded===5?
        (<button className="addProductButton" onClick={handleSumbit}>Create</button>):
        (<button className="addProductButton" onClick={handleUpload}>Upload</button>)}
      </form>
    </div>
  );
}
