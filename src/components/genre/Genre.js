import React from "react";

/*
[
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
*/

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectType = this.handleSelectType.bind(this);
    this.state = {
      // "DataSource" is some global data source
      type: "movie",
      genre : "All",
      genres: []
    };
  }

  async componentDidMount() {
    {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=823bc48a87be98bc698e954c8002fb1e&language=en-US`);
          if (!response.ok) {
            throw Error(response.statusText);
          }
          const json = await response.json();

          this.setState({ genres: json.genres },() => console.log(json));
        } catch (error) {
          console.log(error);
        }
      }
  }

  handleSelectType(e) {
    console.log(e.target.value)
    this.setState({ genre : e.target.value });
  }

  render() {
    return (
      <select onChange={this.handleSelectType} value={this.state.genre}>
          <option value="All">
            All
          </option>
        {
            this.state.genres.length > 0 ?
            this.state.genres.map((genre,index) =>
            <option value={genre.name} data-id={genre.id} key={genre.id+index}>
                {genre.name}
            </option>
            )
            :
            "lol"
        }
      </select>
    );
  }
}

export default Genre;