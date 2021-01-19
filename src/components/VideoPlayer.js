import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'
import {Button, Form, TextArea} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'


const VideoPlayer = (props) => {

 

     const [comment, setComment] = useState("");
     const [videoPick, setVideoPick] = useState("");
     const [videoInfo, setVideoInfo] = useState([]);



const changeHandler = (e) => {
     setComment({comment: e.target.value})

}
 
     const submitComment = () => {
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/videos/comments`, {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Accepts": "application/json",
                    "Content-type": "application/json"
               },
               body: JSON.stringify({ comment: comment, user: props.user, avatar: props.user.avatar, username: props.user.username, yt_id: videoPick, id:videoPick, title: videoInfo.snippet.title, thumbnail: videoInfo.snippet.thumbnails.default.url })
          })
               .then(response => response.json())
               .then(data => {
                    setComment({comment: ""})
                    props.history.push("/community_videos")
               })
                        
               }
               
              const chooseVideo = (item) => {
                    setVideoPick({videoPick: item.id.videoId})
                    setVideoInfo({videoInfo: item})
                 } 




    
          return(
             <>
             <Background>
             <h1 style={{color: "red", fontFamily: "Helvetica", fontSize: "40px"}}>Search and Discuss New Content</h1>
              <FilmContainer> 
                   <FilmBox>
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url={`https://www.youtube.com/watch?v=${videoPick}`}
                 width= '100%'
                 height='100%'
                 controls={true}
                 />
               </PlayerWrapper>
               </FilmBox>
               </FilmContainer>

               <Form >
                 < TextArea style={{width: "700px", height: "50px", marginTop: "0px"}}  placeholder='Comments' name="comment" value={comment} onChange={changeHandler} /> 
                 <Button           
                               onClick={submitComment}
                               content='Add Comment'
                               labelPosition='right'
                               icon='pencil'
                              color='red'
                              position="right"
                              style={{marginTop: "0px", height: "50px" }}
                          />
                    </Form>


               <div className="vidGallery" style={{display: "flex", marginLeft: "250px", marginTop: "50px"}}> 
                 {props.videoList.map(item => (
                   <ul key={item.id.videoId}>
                     <div >
                       <b style={{color: "red"}} onClick={() => chooseVideo(item)}>{item.snippet.title}</b>
                     
                     </div>
                     <img  alt="" src={item.snippet.thumbnails.default.url}/>
                     </ul>
                 
                    
                 ))}
                 </div>
    
                 </Background>

</>
        
          )

     }




export default withRouter(VideoPlayer)

const Background = styled.div`
background-color: black;
height: 100vh;
`



const PlayerWrapper = styled.div`
margin: auto;
position: relative;
padding-top: 56.25%;
`

const FilmBox = styled.div`
height: 500px;
width: 100%;
max-width: 800px;
`

const FilmContainer = styled.div`
width: 100%
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

`
