import React, { useEffect, useState } from "react";
import { Form, TextArea, Button, Comment, Icon } from "semantic-ui-react";
import {
  Back,
  CommentFrame,
  Background,
  VidTitle,
  VidGallery,
  MovieAndReviews,
  MovieShowDiv,
  OverviewStyle,
  CommentUsernameStyle,
  CommentTextStyle,
  AvatarImageStyle,
} from "./MovieShowStyles";
import VideoScreen from "../video-screen/VideoScreen"

let api_key = process.env.REACT_APP_YT_API_KEY;

const MovieShow = ({ match, user, history }) => {
  const [movie, setMovie] = useState([]);

  const [receivedReview, setReceivedReview] = useState([]);

  const [videoList, setVideoList] = useState([]);

  const [videoPick, setVideoPick] = useState([]);

  const [review, setReview] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchMovies = (async) => {
      return fetch(`http://localhost:3001/movies/${match.params.movieId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setMovie(data.single_movie);
          setReceivedReview(data.reviews);
        });
    };
    fetchMovies();
  }, [match.params.movieId]);

  const submitReview = () => {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3001/movies/${match.params.movieId}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        review: review,
        user: user,
        title: movie.title,
        username: user.username,
      }),
    })
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
    history.goBack();
  };

  return (
    <>
      <Background>
        <Back>
          <Button color="red" onClick={goBack}>
            Rewind
          </Button>
        </Back>

        <MovieAndReviews>
          <MovieShowDiv>
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <OverviewStyle> {movie.overview}</OverviewStyle>
          </MovieShowDiv>

          <div className="reviewsformdiv" style={{ marginTop: "150px" }}>
            <div className="reviews">
              {receivedReview.map((review) => (
                <>
                  <CommentFrame>
                    <div className="commentpic">
                      <Comment>
                        <CommentUsernameStyle>
                          {" "}
                          {review.username}
                        </CommentUsernameStyle>

                        <CommentTextStyle key={review.id}>
                          {review.review}
                        </CommentTextStyle>
                        <AvatarImageStyle
                          alt=""
                          src={`/${review.avatar}`}
                          width="60px"
                          height="75px"
                        ></AvatarImageStyle>
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
        </MovieAndReviews>

        <div className="buttonandvideo" style={{ marginTop: "50px" }}>
          <div className="buttondiv" style={{paddingBottom: "10px"}}>
            {" "}
            <Button onClick={clickSearch} icon labelPosition="left">
              Clips & Trailers
              <Icon name="play" />
            </Button>{" "}
          </div>
  <VideoScreen videoPick={videoPick}/>
        </div>

        <VidGallery>
          Click a video title to play
          {videoList.map((item) => (
            <ul key={item.id.videoId}>
              <div>
                {" "}
                <VidTitle onClick={() => chooseVideo(item)}>
                  {item.snippet.title}
                </VidTitle>
              </div>

              <img
                style={{ border: "2px solid red", marginTop: "2px" }}
                alt=""
                src={item.snippet.thumbnails.default.url}
              />
            </ul>
          ))}
        </VidGallery>
      </Background>
    </>
  );
};

export default MovieShow;
