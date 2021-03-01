import React, { useState } from "react";
import MovieCard from "../movie-card/MovieCard.js";
import SearchForm from "../search-form/SearchForm";
import { Background, MyContainer } from "./MovieListStyles";

const MovieList = ({ movies, submitFavorite, goToShow }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const renderSearch = () => {
    return movies
      .filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          submitFavorite={submitFavorite}
          goToShow={goToShow}
        />
      ));
  };

  const searchChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Background>
        <SearchForm
          searchTerm={searchTerm}
          searchChangeHandler={searchChangeHandler}
        />
        <MyContainer>{renderSearch()}</MyContainer>
      </Background>
    </>
  );
};

export default MovieList;
