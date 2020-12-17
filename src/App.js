import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    try {
      const movies = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
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
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading..</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
        )
      </section>
    );
  }
}

export default App;
