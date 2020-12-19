import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  searchMovie = (event) => {
    console.log(event.target.value);
  };

  getMovies = async () => {
    try {
      const movies = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?sort_by=rating?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80"
      );
      console.log(movies.data.data.movies);
      this.setState({ movies: movies.data.data.movies, isLoading: false });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getMovies();
    console.log("here");
  }
  render() {
    //    return <div> {this.state.isLoading ? "Loading" : "Ready" </div>
    // Modern JS
    const { isLoading, movies, search } = this.state;
    return (
      <section>
        <h1 className="header">Download Torrent Movies!</h1>
        <form action="" onSubmit={this.searchMovie}></form>
        <input
          type="text"
          name="search"
          id="search"
          onKeyPress={this.searchMovie}
        />
        <div className="container">
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading..</span>
            </div>
          ) : (
            <div className="movies row">
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                  torrents={movie.torrents}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default App;
