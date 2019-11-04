import React from "react";

function Movie({ movieData }) {
  return (
    <div>
      <div>
         <img src={'https://image.tmdb.org/t/p/w185'+movieData.poster_path}></img> 
      </div>
      <div>{movieData.original_title}</div>
      <div>{movieData.release_date}</div>
    </div>
  );
}

function MovieList({ data }) {
  return (
    <div>
      {data && data.results && data.results.length > 0 ? (
        data.results.map(movie => <Movie movieData={movie} />)
      ) : (
        <div>22</div>
      )}
    </div>
  );
}

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.handleGetMovies = this.handleGetMovies.bind(this);
    this.state = {
      // "DataSource" is some global data source
      type: this.props.type || "",
      genre: this.props.genre || "",
      searchQuery: this.props.searchQuery || "",
      moviesData: {}
    };
  }

  componentDidMount()
  {
    this.handleGetMovies()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.state.type) {
      this.setState({ type: nextProps.type },() => this.handleGetMovies());
    }
    if (nextProps.genre !== this.state.genre) {
      this.setState({ genre: nextProps.genre }, () =>this.handleGetMovies());
    }
    if (nextProps.searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery: nextProps.searchQuery }, () =>this.handleGetMovies());
    }
    if (nextProps.dateRange !== this.state.dateRange) {
      this.setState({ dateRange: nextProps.dateRange }, () =>this.handleGetMovies());
    }
  }

  handleGetMovies() {
    let _self = this;
    let searchURL = "";
    //https://developers.themoviedb.org/3/discover/movie-discover
    if (this.state.searchQuery)
        searchURL = `https://api.themoviedb.org/3/search/movie?api_key=823bc48a87be98bc698e954c8002fb1e&query=${this.state.searchQuery}&page=1&include_adult=false`
    else
        searchURL = `https://api.themoviedb.org/3/discover/${this.state.type}?api_key=823bc48a87be98bc698e954c8002fb1e&with_keywords=${this.state.searchQuery}&with_genres=${this.state.genre}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

      fetch(
        searchURL
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          _self.setState({
            moviesData: data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  render() {
    return <MovieList data={this.state.moviesData}></MovieList>;
  }
}

export default Movies;
