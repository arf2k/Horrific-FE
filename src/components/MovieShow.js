import React, { useEffect, useState } from "react";
import { Form, TextArea, Button, Comment, Icon } from "semantic-ui-react";
import ReactPlayer from "react-player";
import styled from "styled-components";

let api_key = process.env.REACT_APP_YT_API_KEY;

const MovieShow = (props) => {
  const [movie, setMovie] = useState([]);

  const [receivedReview, setReceivedReview] = useState([]);

  const [videoList, setVideoList] = useState([]);

  const [videoPick, setVideoPick] = useState([]);

  const [review, setReview] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchMovies = () => {
    return fetch(`http://localhost:3001/movies/${props.match.params.movieId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMovie(data.single_movie);
        setReceivedReview(data.reviews);
      });
     }
     fetchMovies()
  }, [props.movieId]);

  const submitReview = () => {
    let token = localStorage.getItem("token");
    fetch(
      `http://localhost:3001/movies/${props.match.params.movieId}/reviews`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accepts: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          review: review,
          user: props.user,
          title: movie.title,
          username: props.user.username,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setReceivedReview(data);
        setReview("");
      });
  };



  const searchYoutube = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${movie.title}&key=${api_key}`,
      {
        method: "GET",
        header: "Accept: application/json",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setVideoList(data.items);
      });
  };

  const chooseVideo = (item) => {
    setVideoPick(item.id.videoId);
  };

  const clickSearch = () => {
    searchYoutube();
  };

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <>
      <Background>
        <Back>
          <Button color="red" onClick={goBack}>
            Rewind
          </Button>
        </Back>

        <div
          className="movieandreviews"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="movieShow" style={{ marginLeft: "150px" }}>
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />

            <h3 style={{ color: "red", width: "600px" }}>{movie.overview}</h3>
          </div>
          <div className="reviewsformdiv" style={{ marginTop: "150px" }}>
            <div className="reviews">
              {receivedReview.map((review) => (
                <>
                  <CommentFrame>
                    <div className="commentpic">
                      <Comment>
                        <h5
                          style={{
                            textAlign: "left",
                            marginLeft: "5px",
                            color: "red",
                            marginTop: "5x",
                          }}
                        >
                         
                          {review.username}
                        </h5>
                        <Comment.Text
                          style={{
                            color: "red",
                            flexWrap: "wrap",
                            marginLeft: "120px",
                            marginTop: "-18px",
                            textAlign: "start",
                            marginRight: "5px",
                          }}
                          key={review.id}
                        >
                          {review.review}
                        </Comment.Text>
                        <img
                          alt=""
                          src={`/${review.avatar}`}
                          style={{
                            display: "flex",
                            marginLeft: "10px",
                            marginTop: "-35px",
                            position: "absolute",
                            bottom: "0",
                            marginBottom: "10px",
                          }}
                          width="60px"
                          height="75px"
                        />
                      </Comment>
                    </div>
                  </CommentFrame>
                </>
              ))}
            </div>

            <div className="formdiv" style={{ marginTop: "200px" }}>
              <Form>
                <TextArea
                  style={{ width: "500px" }}
                  placeholder="Write a review"
                  name="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </Form>
              <Button
                onClick={submitReview}
                content="Add Review"
                labelPosition="right"
                icon="pencil"
                color="red"
                position="right"
              />
            </div>
          </div>
        </div>

        <div className="buttonandvideo" style={{ marginTop: "50px" }}>
          <div className="buttondiv">
            {" "}
            <Button onClick={clickSearch} icon labelPosition="left">
              Clips & Trailers
              <Icon name="play" />
            </Button>{" "}
          </div>
          <FilmContainer>
            <FilmBox>
              <PlayerWrapper>
                <ReactPlayer
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "none",
                  }}
                  url={`https://www.youtube.com/watch?v=${videoPick}`}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              </PlayerWrapper>
            </FilmBox>
          </FilmContainer>
        </div>

        <div
          className="vidGallery"
          style={{ display: "inline-flex", marginLeft: "100px" }}
        >
          Click a video title to play
          {videoList.map((item) => (
            <ul key={item.id.videoId}>
              <div style={{ color: "red" }}>
                <b onClick={() => chooseVideo(item)}>{item.snippet.title} </b>
              </div>
              <img alt="" src={item.snippet.thumbnails.default.url} />
            </ul>
          ))}
        </div>
      </Background>
    </>
  );
};

export default MovieShow;

const Back = styled.div`
  text-align: right;
`;

const CommentFrame = styled.div`
  border-color: red;
  border-style: ridge;
  border-width: 5px;
  width: 500px;
  height: 130px;
  background-color: #343a40;
  margin: 10px auto;
  display: grid;
  position: relative;
`;

const Background = styled.div`
  background-color: black;
`;

const PlayerWrapper = styled.div`
  margin: auto;
  position: relative;
  padding-top: 56.25%;
`;

const FilmBox = styled.div`
  height: 500px;
  width: 100%;
  max-width: 800px;
`;

const FilmContainer = styled.div`
width: 100%
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

`;
