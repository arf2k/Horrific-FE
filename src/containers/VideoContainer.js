import React from 'react';
import VideoPlayer from '../components/VideoPlayer.js';
import {Segment, Input} from 'semantic-ui-react';
import VideoPlayback from '../components/VideoPlayback.js'
import styled from 'styled-components'




let api_key = process.env.REACT_APP_YT_API_KEY
class VideoContainer extends React.Component {


     state = {
      
          searchTerm: "",
          videoList: [],
          videoPick: "",
          videoInfo: []

     }



     searchYoutube() {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.state.searchTerm}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
                    this.setState({videoList: data.items})
               })
     }


   


     searchChange = (e) => {
          this.setState({ searchTerm: e.target.value })
     }

     keyDown = (e) => {
          if (e.keyCode === 13) {
         
               this.searchYoutube()


          }
     }


     chooseVideo = (item) => {
        this.setState({videoPick: item.id.videoId})
        this.setState({videoInfo: item})
     } 

     hide = (e) => {
          e.target.style.display = "none"
     }



     render() {
          return (
               <>
               <Background>
                    <Segment textAlign="right" inverted color="black">
                         <Input icon='search' type="text" name="search" placeholder='Search Videos' onKeyDown={this.keyDown} value={this.state.searchTerm} onChange={this.searchChange} />
                    </Segment>
                    <VideoPlayer videoPick={this.state.videoPick} user={this.props.user} videoInfo={this.state.videoInfo} videoList={this.state.videoList}/>
                    </Background>
                
              </>
          )
     }







}

export default VideoContainer


const Background = styled.div`
background-color: black;

`


