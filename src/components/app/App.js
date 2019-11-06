import React, { useState } from "react";
import "./App.scss";
import Genre from "../genre/Genre";
import Movies from "../movies/Movies";
import Search from "../search/Search";
import DateFilter from "../date/DateFilter";

export default function App(props) {
  const [type, setType] = useState("movie");
  const [genre, setGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");


  function handleSelectType(type) {
    setType(type);
  }

  function handleSelectGenre(genre)
  {
    setGenre(genre)
  }

  function handleSearchQuery(searchQuery)
  {
    setSearchQuery(searchQuery)
  }

  function handleDateRange(dateRange)
  {
    setDateRange(dateRange)
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li onClick={() => handleSelectType("movie")}>Movies</li>
          <li onClick={() => handleSelectType("tv")}>TV Shows</li>
        </ul>
      </header>
      <div className="container">
        <Genre onSelectGenre={handleSelectGenre}></Genre>
        <Search onSelectSearch={handleSearchQuery}></Search>
        <DateFilter onDateSelect={handleDateRange}></DateFilter>
        <Movies
          type={type}
          genre={genre}
          searchQuery={searchQuery}
          dateRange={dateRange}
        ></Movies>
      </div>
    </div>
  );
}
