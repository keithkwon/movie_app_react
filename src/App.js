import React from "react";
import axios from "axios";
import Movie from "./Movie";

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
      <div>
        {" "}
        {isLoading
          ? "Loading"
          : movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                />
              );
            })}{" "}
      </div>
    );
  }
}

export default App;
