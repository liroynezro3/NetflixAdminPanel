import "./featuredInfo.css";
import { useState } from "react";
import { useEffect } from "react";

export default function FeaturedInfo() {
  const [countUsers,setCountUsers]=useState(null);
  const [countMovies,setCountMovies]=useState(null);
  const fetchCountUsers = async () => {
    try {
      const countusers = await fetch(
        "https://netflixbackend-cemp.onrender.com/api/users/countusers",{
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        }
      );
      if (!countusers.ok) {
        throw new Error("Request failed!");
      }
      const usersCountResponse = await countusers.json();
      setCountUsers(usersCountResponse.countusers);
    } catch (err) {
      console.log(err)
    }}
    
    const fetchCountMovies = async () => {
      try {
        const countmovies = await fetch(
          "https://netflixbackend-cemp.onrender.com/api/movies/countmovies",{
            headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            }
          }
        );
        if (!countmovies.ok) {
          throw new Error("Request failed!");
        }
        const moviesCountResponse = await countmovies.json();
        setCountMovies(moviesCountResponse.countmovies);
      } catch (err) {
        console.log(err)
      }}
    useEffect(()=>{
      fetchCountUsers()
      fetchCountMovies();
    },[])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Registered users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{countUsers}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Movies quantity</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{countMovies}</span>
        </div>
      </div>
    </div>
  );
}
