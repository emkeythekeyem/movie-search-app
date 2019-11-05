import React, { useState, useEffect } from "react";

export default function Genre(props) {
  const [type, setType] = useState("movie");
  const [genre, setGenre] = useState("All");
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    async function fetchGenres(){
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=823bc48a87be98bc698e954c8002fb1e&language=en-US`
          );
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const json = await response.json();
  
          setGenres(json.genres);
        } catch (error) {
          console.log(error);
        }
    }
    fetchGenres();
  });

  function handleSelectType(e) {
    setGenre(e.target.value);
  }

  return (
    <select onChange={handleSelectType} value={genre}>
      <option value="All">All</option>
      {genres.length > 0
        ? genres.map((genre, index) => (
            <option
              value={genre.name}
              data-id={genre.id}
              key={genre.id + index}
            >
              {genre.name}
            </option>
          ))
        : "lol"}
    </select>
  );
}
