import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'

let searchTerm = "horrormovie"
let api_key = process.env.REACT_APP_YT_API_KEY

class VideoPlayer extends React.Component {

  


 



     render(){
          return(
               <>
               <h1>Community Videos</h1>
               
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url={`https://www.youtube.com/watch?v=${this.props.videoId}`}
                 width= '50%'
                 height='50%'
                 controls={true}
                 />
               </PlayerWrapper>
             

      
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url={`https://www.youtube.com/watch?v=${this.props.videoId}`}
                 width= '50%'
                 height='50%'
                 controls={true}
                 />
               </PlayerWrapper>
             


        
</>


          )

     }


}

export default VideoPlayer

const PlayerWrapper = styled.div`
position: relative;
padding-top: 56.25%;

`