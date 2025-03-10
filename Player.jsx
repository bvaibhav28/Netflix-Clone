import React, {useEffect, useState} from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import {useNavigate, useParams} from "react-router-dom";
const Player = () => {
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const navigate = useNavigate();

  const {id} = useParams();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzNiZGE5MzhmZTdjOTMwOWEyYzRjZWRhMzQwMzYwNSIsIm5iZiI6MTc0MDc0MTI2NS44ODk5OTk5LCJzdWIiOiI2N2MxOWE5MWE2ZTU1MTExOWEzNWMyNzgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GphkAAPB-vJHVMdxjU2U_bI3nUCZl8tcIi4TwCpA5Ac",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=> {navigate("/")}}/>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player_info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
