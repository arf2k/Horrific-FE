import React, { useState, useEffect } from "react";
import MovieList from "../../components/movie-list/MovieList.js";
import MovieShow from "../../components/movie-show/MovieShow.js";
// import FilmContext from "../../contexts /film-context/FilmContext.js";
import { Background } from "./MovieContainerStyles";

const MovieContainer = ({ user }) => {
  const [api, setApi] = useState([]);
  const [chosenMovie, setChosenMovie] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setApi(data);
      });
  }, []);

  const submitFavorite = (movieObj) => {
    console.log(movieObj);
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/users/favorites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ movie: movieObj, user: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const goToShow = (movieObj) => {
    return setChosenMovie(movieObj);
  };

  // const collections = useContext(FilmContext)
  return (
    <>
      <Background>
        <MovieList
          movies={api}
          // movies = {collections}
          submitFavorite={submitFavorite}
          goToShow={goToShow}
        />

        {chosenMovie ? <MovieShow chosenMovie={chosenMovie} /> : null}
      </Background>
    </>
  );
};
export default MovieContainer;
