import React from "react";
import { Card } from "semantic-ui-react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

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
        <span
          onClick={() => {
            props.submitFavorite(props.movie);
          }}
          style={{ fontSize: "70px", color: "red", marginTop: "5px", cursor: "pointer" }}
        >
          &#9760;
        </span>
        <Card.Content></Card.Content>
      </CardWrapper>
    </Background>
  );
}

export default withRouter(MovieCard);

const Background = styled.div`
  background-color: black;
`;

const CardWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
