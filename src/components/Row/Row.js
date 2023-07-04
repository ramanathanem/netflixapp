import React,{useEffect,useState} from "react";
import axios from "axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
 
const base_url="https://www.themoviedb.org/video/play?key=d0EWwDcbtoM";

const Row = ({title, fetchUrl, isLargeRow}) => {
  const [movies, setMovies] = useState([]);
  console.log("process.env.REACT_APP_API",process.env.REACT_APP_API);
  const[trailerUrl,setTrailerUrl] = useState("");
  console.log(fetchUrl); 
  useEffect(() => {
    const fetchData= async () => {
      const response= await axios.get(`${process.env.REACT_APP_API}${fetchUrl}`);
      setMovies(response.data.results);
      return response;
    };
    fetchData();
  },
  []);
  //console.log("movies",movies);
  const handleClick = (movie) => {
    if(trailerUrl){
      setTrailerUrl("")
    }else{
      movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
      })
    }
    };
 
  
  return (
    <div className="row">
        <h2>{title} </h2>
        <div className="row-posters">
          {movies && movies.map((movie) => (
            <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row-poster ${isLargeRow && "row-posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            />
            ))}
        </div>
    </div>
  );
};

export default Row;