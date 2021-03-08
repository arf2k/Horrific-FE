import React from 'react';
import { FilmContainer, FilmBox, PlayerWrapper} from "./VideoScreenStyles";
import ReactPlayer from "react-player";



const VideoScreen = ({ videoPick, onProgress, onPause}) => (

  
        <FilmContainer>
        <FilmBox>
          <PlayerWrapper>
            <ReactPlayer
              style={{ position: "absolute", top: "0", left: "0" }}
              url={`https://www.youtube.com/watch?v=${videoPick}`}
              width="100%"
              height="100%"
              controls={true}
              onProgress={onProgress}
              onPause={onPause}
            />
          </PlayerWrapper>
        </FilmBox>
      </FilmContainer>


)

export default VideoScreen