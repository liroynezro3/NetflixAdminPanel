import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { useState,useEffect, useContext } from "react";
import axios from "axios"
import { useMemo } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
export default function Home() {
  const MONTHS = useMemo(()=>["Jan","Feb", "Mar", "Apr", "May", "Jun","July", "Agu", "Sep","Oct","Nov", "Dec",],[]);
  const [userStats, setUserStats] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_NETFLIXBACKEND + "api/users/stats", {
          headers: {
            token:
              "Bearer " + user.accessToken
          },
        });
        console.log(res.data)
        const statsList = res.data.sort(function (a,b) {return a._id-b._id})
        statsList.map(item=>setUserStats((prev)=>[...prev,{name:MONTHS[item._id-1],"New User": item.total}]))
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <WidgetSm/>
    </div>
  );
}
