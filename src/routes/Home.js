import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";
import logo from "./af.png";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movies: [],
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.searchMovie.bind(this);
  }

  searchMovie = async (event) => {
    event.preventDefault();
    console.log(this.state.value);
    try {
      const movies = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${this.state.value}`
      );
      console.log(movies.data.data.movies);
      this.setState({
        movies: movies.data.data.movies.slice(0, 12),
        isLoading: false,
      });
    } catch (err) {
      alert("Oops couldn't find a match! Sorry :p");
      console.log(err);
    }
  };

  getMovies = async () => {
    try {
      const movies = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?sort_by=rating?with_rt_ratings=true?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80"
      );
      console.log(movies.data.data.movies);
      this.setState({
        movies: movies.data.data.movies.slice(0, 12),
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {
    this.getMovies();
    console.log("here");
  }
  render() {
    //    return <div> {this.state.isLoading ? "Loading" : "Ready" </div>
    // Modern JS
    const { isLoading, movies } = this.state;
    return (
      <section className="d-flex flex-column align-items-center">
        <img className="logo mb-4" src={logo} alt="" width="72" height="72" />
        <form
          className="form-group"
          onSubmit={this.searchMovie}
          autoComplete="off"
        >
          <input
            value={this.state.value}
            className="form-control"
            type="text"
            name="search"
            id="search"
            placeholder="What movie do you like?"
            onChange={this.handleChange}
          />
        </form>

        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Just a second please :)</span>
          </div>
        ) : (
          <div className="container d-flex flex-wrap justify-content-center">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                rating={movie.rating}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                torrents={movie.torrents}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
