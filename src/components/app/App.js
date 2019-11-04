import React from "react";
import logo from "../../assets/images/logo.svg";
import "./App.scss";
import Genre from "../genre/Genre";
import Movies from "../movies/Movies";
import Search from "../search/Search";
import DateFilter from "../date/DateFilter";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleSelectGenre = this.handleSelectGenre.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
    this.handleDateRange = this.handleDateRange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      type: "movie",
      genre: "",
      searchQuery : "",
      dateRange : ""
    };
  }

  handleSelectType(type) {
    this.setState({ type });
  }

  handleSelectGenre(genre)
  {
    this.setState({ genre });
  }

  handleSearchQuery(searchQuery)
  {
    console.log("changeeeeeeed sewarch "+searchQuery )
    this.setState({ searchQuery : searchQuery });
  }

  handleDateRange(dateRange)
  {
    this.setState({ dateRange });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            <li onClick={() => this.handleSelectType("movie")}>Movies</li>
            <li onClick={() => this.handleSelectType("tv")}>TV Shows</li>
          </ul>
        </header>
        <div className="container">
          <Genre onSelectGenre={this.handleSelectGenre}>

          </Genre>
          <Search onSelectSearch={this.handleSearchQuery}>

          </Search>
          <DateFilter onDateSelect={this.handleDateRange}>

          </DateFilter>
          <Movies 
              type={this.state.type} 
              genre={this.state.genre} 
              searchQuery={this.state.searchQuery} 
              dateRange={this.state.dateRange}
          >

          </Movies>
        </div>
      </div>
    );
  }
}

export default App;
