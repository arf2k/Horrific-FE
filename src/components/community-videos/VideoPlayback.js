import React, { useState, useEffect } from "react";
import { Comment, Form, TextArea, Button } from "semantic-ui-react";
import {
  Back,
  GalleryStyle,
  UsernameTitle,
  AvatarStyle,
  CommentTextBox,
  VidTitle,
  CommentFrame,
  Background,
} from "./VideoPlaybackStyles";
import VideoScreen from "../video-screen/VideoScreen";

const VideoPlayback = ({ user, history }) => {
  const [videos, setVideos] = useState([]);
  const [videoPick, setVideoPick] = useState("");
  const [chosenVideoInfo, setChosenVideoInfo] = useState([]);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [videosNumber, setVideosNumber] = useState(3);

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetch("http://localhost:3001/videos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const getAllComments = () => {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3001/videos/${chosenVideoInfo.id}/comments`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setAllComments(data);
      });
  };

  const chooseVideo = (video) => {
    setVideoPick(video.yt_id);
    setChosenVideoInfo(video);
    getAllComments();
  };

  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitComment = () => {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:3001/videos/${chosenVideoInfo.id}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accepts: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        user: user,
        avatar: user.avatar,
        username: user.username,
        yt_id: chosenVideoInfo.yt_id,
        id: chosenVideoInfo.id,
        title: chosenVideoInfo.title,
        thumbnail: chosenVideoInfo.thumbnail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllComments();
        setComment("");
      });
  };

  const goBack = () => {
    history.goBack();
  };

  let comments = allComments;

  return (
    <>
      <Background>
        <Back>
          {" "}
          <Button color="red" onClick={goBack}>
            Rewind
          </Button>{" "}
        </Back>

        <VidTitle>Community Videos</VidTitle>

        <VideoScreen videoPick={videoPick} />

        <GalleryStyle>
          {videos.slice(0, videosNumber).map((video) => (
            <ul key={video.id}>
              <div>
                <b onClick={() => chooseVideo(video)}>{video.title}</b>
              </div>
              <img alt="" src={video.thumbnail} />
            </ul>
          ))}
          <Button
            color="red"
            style={{ height: "35px", margin: "auto" }}
            onClick={() => setVideosNumber(videosNumber + 2)}
          >
            Show More
          </Button>
        </GalleryStyle>
        {comments.map((comment) => (
          <CommentFrame>
            <Comment>
              <UsernameTitle> - {comment.username}</UsernameTitle>
              <CommentTextBox>
                <Comment.Text key={comment.id} style={{ color: "red" }}>
                  {comment.comment}
                </Comment.Text>
              </CommentTextBox>
              <AvatarStyle>
                <img
                  alt=""
                  src={`/${comment.avatar}`}
                  width="60px"
                  height="75px"
                />
              </AvatarStyle>
            </Comment>
          </CommentFrame>
        ))}

        <Form>
          <TextArea
            style={{ width: "800px", marginTop: "50px" }}
            placeholder="Comments"
            name="comment"
            value={comment}
            onChange={changeHandler}
          />
        </Form>
        <Button
          onClick={submitComment}
          content="Add Review"
          labelPosition="right"
          icon="pencil"
          color="red"
          position="right"
        />
      </Background>
    </>
  );
};

export default VideoPlayback;
