import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'

let searchTerm = "horrormovie"
let api_key = process.env.REACT_APP_YT_API_KEY

class VideoPlayer extends React.Component {

     state= {
          videoId : ""
     }


     componentDidMount() {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
          .then(resp => resp.json())
          .then(data =>{
               this.setState({videoId : data.items[0].id.videoId})
          })
     }



     render(){
          return(
               <>
               <h1>Community Videos</h1>
               
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url={`https://www.youtube.com/watch?v=${this.state.videoId}`}
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