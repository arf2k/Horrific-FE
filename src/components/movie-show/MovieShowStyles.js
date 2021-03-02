import styled from "styled-components";

export const Back = styled.div`
  text-align: right;
`;

export const CommentFrame = styled.div`
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

export const MovieShowDiv = styled.div`
  margin-left: 150px;
`;

export const OverviewStyle = styled.h3`
  color: red;
  width: 600px;
`;

export const CommentUsernameStyle = styled.h5`
  text-align: left;
  margin-left: 5px;
  color: red;
  margin-top: 5x;
`;

export const CommentTextStyle = styled.div`
  color: red;
  flex-wrap: wrap;
  margin-left: 120px;
  margin-top: -18px;
  text-align: start;
  margin-right: 5px;
`;


export const AvatarImageStyle = styled.img`
display: flex;
margin-left: 10px;
margin-top: -35px;
position: absolute;
bottom: 0;
margin-bottom: 10px;
`

export const MovieAndReviews = styled.div`
  display: flex;
  justify-content: center;
`;

export const Background = styled.div`
  background-color: black;
`;

export const PlayerWrapper = styled.div`
  margin: auto;
  position: relative;
  padding-top: 56.25%;
`;

export const FilmBox = styled.div`
  height: 500px;
  width: 100%;
  max-width: 800px;
`;

export const FilmContainer = styled.div`
width: 100%
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

`;

export const VidGallery = styled.div`
  display: flex;
  margin-left: 75px;
  margin-top: 10px;
`;

export const VidTitle = styled.b`
  color: red;
  cursor: pointer;
`;
