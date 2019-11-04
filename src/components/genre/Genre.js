import React from "react";

let genresArray = [
  "All",
  "Literary genres",
  "Absurdist",
  "Surreal",
  "Whimsical",
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical",
  "Historical fiction",
  "Horror",
  "Magical realism",
  "Mystery",
  "Paranoid fiction",
  "Philosophical",
  "Political",
  "Romance",
  "Saga",
  "Satire",
  "Science fiction",
  "Sci-fi",
  "Social",
  "Speculative",
  "Thriller",
  "Urban",
  "Western",
  "Animation",
  "Live-action",
  "Other",
  "Videogame",
  "Musical",
  "References",
  "External links"
];

const genreList = genresArray.map((genre) =>
  <option value={genre} key={genre}>
    {genre}
  </option>
);

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectType = this.handleSelectType.bind(this);
    this.state = {
      // "DataSource" is some global data source
      type: "movie",
      genre : "All"
    };
  }

  handleSelectType(e) {
    this.setState({ genre : e.target.value });
  }

  render() {
    return (
      <select onChange={this.handleSelectType} value={this.state.genre}>
        {genreList}
      </select>
    );
  }
}

export default Genre;