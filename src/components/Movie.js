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
