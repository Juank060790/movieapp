import React from "react";
import MovieCard from "./MovieCard";

export default function MovieBoard({ movieList }) {
  const getImage = (img) => {};

  return (
    <div className="movieList Row container">
      {movieList &&
        movieList.map((movie) => {
          return <MovieCard movie={movie} getImage={getImage} />;
        })}
    </div>
  );
}
