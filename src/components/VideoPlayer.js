import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'

class VideoPlayer extends React.Component {

     render(){
          return(
               <>
               <h1>Community Videos</h1>
               
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                 width= '50%'
                 height='50%'
                 controls={true}
                 />
               </PlayerWrapper>
             

               https://youtube.googleapis.com/youtube/v3/search?order=viewCount&q=skateboarding%20dog&type=video&videoDefinition=high&key=[YOUR_API_KEY] 


        
</>
``

          )

     }


}

export default VideoPlayer

const PlayerWrapper = styled.div`
position: relative;
padding-top: 56.25%;

`