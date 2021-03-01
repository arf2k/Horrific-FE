import React from "react";
import { Button, Card, List } from "semantic-ui-react";
import { Back, Background, MyContainer, CommentFrame } from "./MyMoviesStyles";

class MyMovies extends React.Component {
  state = {
    favorites: [],
    reviews: [],
    iconShown: false,
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/my_movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ favorites: data.favorites, reviews: data.reviews });
      });
  }

  updateFavorites() {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/my_movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ favorites: data.favorites });
      });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  deleteFavorite = (favoriteId) => {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3001/users/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.updateFavorites();
      });
  };

  render() {
    const favorites = this.state.favorites;
    const reviews = this.state.reviews;

    return (
      <>
        <Background>
          <Back>
            {" "}
            <Button color="red" onClick={this.goBack}>
              Rewind
            </Button>{" "}
          </Back>

          <h1
            style={{
              color: "red",
              fontFamily: "Helvetica",
              fontSize: "50px",
              marginLeft: "250px",
            }}
          >
            My Movies
          </h1>

          <MyContainer>
            {favorites.map((favorite) => (
              <>
                {" "}
                <i
                  class="small delete icon"
                  style={{ color: "red" }}
                  onClick={() => this.deleteFavorite(favorite.id)}
                />
                <Card
                  style={{ marginBottom: "0" }}
                  onClick={() =>
                    this.props.history.push(`/movies/${favorite.movie_id}`)
                  }
                  key={favorite.id}
                  image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`}
                />{" "}
              </>
            ))}
          </MyContainer>

          <h1
            style={{
              color: "red",
              marginTop: "100px",
              fontFamily: "Helvetica",
              fontSize: "30px",
              marginLeft: "250px",
            }}
          >
            My Reviews
          </h1>

          {reviews.map((review) => (
            <>
              <CommentFrame>
                <List
                  style={{
                    color: "red",
                    fontSize: "15x",
                    textAlign: "initial",
                    marginLeft: "5px",
                  }}
                  key={review.id}
                >
                  {" "}
                  {review.title} : {review.review}{" "}
                </List>
                <i
                  onClick={() =>
                    this.props.history.push(`/movies/${review.movie_id}`)
                  }
                  style={{
                    color: "red",
                    position: "absolute",
                    right: "0",
                    marginBottom: "5px",
                  }}
                  class="external alternate icon"
                ></i>
              </CommentFrame>
            </>
          ))}
        </Background>
      </>
    );
  }
}

export default MyMovies;
