import React, { useState } from "react";
import MovieCard from "./MovieCard.js";
import SearchForm from "./SearchForm.js";
import styled from "styled-components";

function MovieList(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const renderSearch = () => {
    return props.movies
      .filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          submitFavorite={props.submitFavorite}
          goToShow={props.goToShow}
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
}

export default MovieList;

const Background = styled.div`
  background-color: black;
`;

const MyContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin-top: 10vh;
  margin-left: 15vw;
`;
