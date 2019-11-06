import React, { useState, useEffect } from "react";
import "./Movies.scss";

function Movie({ movieData }) {
  return (
    <div className="movie-card">
      <div className="movie-card-title">
        <h2>lorem {/*movieData.original_title*/}</h2>
      </div>
      <div className="movie-card-image">
        {/*<img src={'https://image.tmdb.org/t/p/w185'+movieData.poster_path}></img> */}
        <img alt={"Image Poster"+movieData.original_title} src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"></img>
      </div>
      <div className="movie-card-date">
        {movieData.release_date.slice(0, 4)}
      </div>
    </div>
  );
}

function MovieList({ data }) {
  return (
    <div className="movielist-ctn">
      {data && data.results && data.results.length > 0
        ? data.results.map((movie, index) => (
            <Movie key={movie + index} movieData={movie} />
          ))
        : ""}
    </div>
  );
}

export default function Movies(props) {
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setdateRange] = useState("");
  const [moviesData, setMoviesData] = useState({});


  useEffect(() => {
    handleGetMovies();
  });

  if (props.type !== type) {
    setType(props.type);
  }
  if (props.genre !== genre) {
    setGenre(props.genre)
  }
  if (props.searchQuery !== searchQuery) {
    setSearchQuery(props.searchQuery)
  }
  if (props.dateRange !== dateRange) {
    setdateRange(props.dateRange)
  }
  // No state update necessary

  function handleGetMovies() {
    let searchURL = "";
    //https://developers.themoviedb.org/3/discover/movie-discover
    if (searchQuery)
      searchURL = `https://api.themoviedb.org/3/search/movie?api_key=823bc48a87be98bc698e954c8002fb1e&query=${encodeURIComponent(
        searchQuery
      )}&page=1&include_adult=false`;
    else
      searchURL = `https://api.themoviedb.org/3/discover/${type}?api_key=823bc48a87be98bc698e954c8002fb1e&with_keywords=${searchQuery}&with_genres=${genre}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

    fetch(searchURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (JSON.stringify(moviesData) !== JSON.stringify(data))
          setMoviesData(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return <MovieList data={moviesData}></MovieList>;
}
