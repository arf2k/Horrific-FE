import React, {useState} from 'react';
import VideoPlayer from '../components/VideoPlayer.js';
import {Segment, Input} from 'semantic-ui-react';
import styled from 'styled-components'




let api_key = process.env.REACT_APP_YT_API_KEY
const VideoContainer = (props) => {


     const [searchTerm, setSearchTerm] = useState("");
     const [videoList, setVideoList] = useState([]);
     const [videoPick, setVideoPick] = useState("");
     const [videoInfo, setVideoInfo] = useState([]);



     const searchYoutube = () => {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchTerm}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
               .then(resp => resp.json())
               .then(data => {
                    setVideoList(data.items)
               })
     }


   


     const searchChange = (e) => {
          setSearchTerm(e.target.value)
     }

     const keyDown = (e) => {
          if (e.keyCode === 13) {
         
               searchYoutube()


          }
     }


     const chooseVideo = (item) => {
        setVideoPick(item.id.videoId)
        setVideoInfo(item)
     } 

    const hide = (e) => {
          e.target.style.display = "none"
     }



     
          return (
               <>
               <Background>
                    <Segment textAlign="right" inverted color="black">
                         <Input icon='search' type="text" name="search" placeholder='Search Videos' onKeyDown={keyDown} value={searchTerm} onChange={searchChange} />
                    </Segment>
                    <VideoPlayer videoPick={videoPick} user={props.user} videoInfo={videoInfo} videoList= {videoList}/>
                    </Background>
                
              </>
          )
     }









export default VideoContainer


const Background = styled.div`
background-color: black;

`


