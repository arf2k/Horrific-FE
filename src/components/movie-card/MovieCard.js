import React from "react";
import { Card } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { Background, CardWrapper, SpanStyle } from "./MovieCardStyles"

const MovieCard = (props) => {
  const clickHandler = (e) => {
    props.history.push(`movies/${props.movie.id}`);
  };

  return (
    <Background>
      <CardWrapper>
        <Card
          raised
          image={`https://image.tmdb.org/t/p/w185${props.movie.poster_path}`}
          onClick={() => {
            clickHandler();
          }}
        />
       <SpanStyle
          onClick={() => {
            props.submitFavorite(props.movie);
          }}
        >
          &#9760;
        </SpanStyle>
        <Card.Content></Card.Content>
      </CardWrapper>
    </Background>
  );
}

export default withRouter(MovieCard);


