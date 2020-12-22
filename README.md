# Movie torrent search with React

> SPA to search for movie torrents. Made with yts API and React. Also my first project with React. 
> List movies on main page. Responsive card grid with poster, title, rating, year and torrent url button.

1. Settings
2. Initial movie list API
3. Search movie function
4. Logo
5. Background Image
6. Deploy



[Check Final Product Here!](https://keithkwon.dev/movie_app_react/#/)



![image-20201223021954424](README.assets/image-20201223021954424.png)







## 1. Settings

### Flow

`npm install npx -g`

install npx on global

No longer needed after newer node

`npx create-react-app movie_app`

`npm start`

![image-20201217183546833](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20201217183546833.png)





```js
//App.js
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Navigation from "./components/Navigation";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/about" component={About} />
      <Route path="/" exact={true} component={Home} />
      <Route path="/movie-detail" component={Detail} />
    </HashRouter>
  );
}

export default App;

```



### Notes

1. What is Hash router and how is it different? Nicholas says having a normal route can be difficult to set in github pages. 
2. Function component vs Class component





## Initial Movie list API

### #React inline if else #async



### Flow

1. this.state is created at constructor
2. this.getMovies() at componentDidMount
3. getMovies() asynchronously requests API and setState

```js
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
//    this.handleChange = this.handleChange.bind(this);
//    this.handleSubmit = this.searchMovie.bind(this);
  }

//  searchMovie = async (event) => {
//    event.preventDefault();
//    console.log(this.state.value);
//    try {
//      const movies = await axios.get(
//        `https://yts.mx/api/v2/list_movies.json?query_term=${this.state.value}`
//      );
//      console.log(movies.data.data.movies);
//      this.setState({
//        movies: movies.data.data.movies.slice(0, 12),
//        isLoading: false,
//     });
//   } catch (err) {
//      alert("Oops couldn't find a match! Sorry :p");
//      console.log(err);
//    }
//  };

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

//  handleChange(event) {
//    this.setState({ value: event.target.value });
//  }

  componentDidMount() {
    this.getMovies();
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
          <div className="container loader">
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

```

```js
//Movie.js

import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ id, year, title, rating, poster, torrents }) {
  return (
    <div className="card">
      <img className="card-img-top" src={poster} alt={title} title={title} />
      <div className="card-body">
        <h5 className="movie__title">{title}</h5>
        <div className="d-flex justify-content-between">
          <h5>{year}</h5>
          <h5>IMDB {rating}</h5>
        </div>
      </div>
      <div className="card-body d-flex align-items-end">
        {torrents.map((torrent, index) => (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `${torrent.url}`;
            }}
            key={index}
            className="torrents__torrent__btn btn btn-link"
          >
            {torrent.quality} Download
          </button>
        ))}
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;

```



### Notes

### #React Button Link #Deconstructor

1. Deconstructor's usage 

   `const { isLoading, movies } = this.state;`

2. Button

             <button
               type="button"
               onClick={(e) => {
                 e.preventDefault();
                 window.location.href = `${torrent.url}`;
               }}
               key={index}
               className="torrents__torrent__btn btn btn-link"
             >
               {torrent.quality} Download
             </button>



## 3. Search Movie

### Flow

1. this.state created at constructor
2. handleChange and handleSubmit binded
3. onChange assigned to input and onSubmit assinged to form
4. input value = {this.state.value}
5. onChange -> state value changes -> input value changes
6. onSubmit -> search movie

```js
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
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
      return(
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
      )

```



### Notes

### #form in React 



## 4. Logo

```js
import logo from "./af.png";

<img className="logo mb-4" src={logo} alt="" width="72" height="72" />
```



Images must be imported to be used in React. This is because of webpack.

Alternative is to use public folder. See `Wiki/react` for more.





## 5. Background Image

```js
// css
body {
  background-image: url("theater2.jfif");
}
//works. but requires jpg file at same location as CSS> 
```



## 6. Deploy

`npm i gh-pages`

```js
// package.json

.
.
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  // Add homepage part
  "homepage": "https://keithkwon.dev/movie_app_react/"
}

```

`npm run deploy`

