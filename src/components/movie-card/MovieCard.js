import React from "react";
import { Card } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Background, CardWrapper, SpanStyle } from "./MovieCardStyles";

const MovieCard = ({ history, submitFavorite, movie }) => {
  const clickHandler = (e) => {
    history.push(`movies/${movie.id}`);
  };

  return (
    <Background>
      <CardWrapper>
        <Card
          raised
          image={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
          onClick={() => {
            clickHandler();
          }}
        />
        <SpanStyle
          onClick={() => {
            submitFavorite(movie);
          }}
        >
          &#9760;
        </SpanStyle>
        <Card.Content></Card.Content>
      </CardWrapper>
    </Background>
  );
};

export default withRouter(MovieCard);
