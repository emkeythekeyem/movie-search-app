import React from "react";
import "./Movies.scss";



function Movie({ movieData }) {
  return (
    <div className="movie-card">
      <div className="movie-card-title">
        <h2>lorem { /*movieData.original_title*/}</h2>
      </div>
      <div className="movie-card-image">
         {/*<img src={'https://image.tmdb.org/t/p/w185'+movieData.poster_path}></img> */}
         <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081"></img>
         
      </div>
      <div className="movie-card-date">Release date {movieData.release_date}</div>
    </div>
  );
}

function MovieList({ data }) {
  return (
    <div className="movielist-ctn">
      {data && data.results && data.results.length > 0 ? (
        data.results.map((movie,index) => <Movie key={movie+index} movieData={movie} />)
      ) : (
        ""
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
      dataRange : this.props.dataRange || "",
      moviesData: {}
    };
  }

  shouldComponentUpdate(nextProps, nextState)
  {
    this.handleGetMovies()
    return true
  }

  componentDidMount()
  {
    this.handleGetMovies()
  }

  static getDerivedStateFromProps(props,state)
  {
    if (props.type !== state.type) {
        return { 
                    type: props.type ,
                    genre: props.genre || "",
                    searchQuery: props.searchQuery || "",
                    dataRange : props.dataRange || "",
                    moviesData: {}
                
                };
      }
      if (props.genre !== state.genre) {
        return { 
                    type: props.type || "",
                    genre: props.genre ,
                    searchQuery: props.searchQuery || "",
                    dataRange : props.dataRange || "",
                    moviesData: {}
                }
      }
      if (props.searchQuery !== state.searchQuery) {
        return { 
                    type: props.type || "",
                    genre: props.genre || "",
                    searchQuery: props.searchQuery,
                    dataRange : props.dataRange || "",
                    moviesData: {}
                }
      }
      if (props.dateRange !== state.dateRange) {
        return { 
                    type: props.type || "",
                    genre: props.genre || "",
                    searchQuery: props.searchQuery || "",
                    dateRange: props.dateRange,
                    moviesData: {}
                }
      }
       // No state update necessary
    return null;
  }

  

  handleGetMovies() {
    
    let _self = this;
    let searchURL = "";
    //https://developers.themoviedb.org/3/discover/movie-discover
    if (this.state.searchQuery)
        searchURL = `https://api.themoviedb.org/3/search/movie?api_key=823bc48a87be98bc698e954c8002fb1e&query=${encodeURIComponent(this.state.searchQuery)}&page=1&include_adult=false`
    else
        searchURL = `https://api.themoviedb.org/3/discover/${this.state.type}?api_key=823bc48a87be98bc698e954c8002fb1e&with_keywords=${this.state.searchQuery}&with_genres=${this.state.genre}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

      fetch(
        searchURL
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {

          if(JSON.stringify(_self.state.moviesData) != JSON.stringify(data))
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
