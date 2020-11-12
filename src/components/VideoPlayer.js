import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'
import {Button, Icon, Form, TextArea} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

let api_key = process.env.REACT_APP_YT_API_KEY

class VideoPlayer extends React.Component {

     state = {
          comment: "",
          videoPick: "",
          videoInfo: []
     }



changeHandler = (e) => {
     this.setState({comment: e.target.value})

}
 
     submitComment = () => {
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/videos/comments`, {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Accepts": "application/json",
                    "Content-type": "application/json"
               },
               body: JSON.stringify({ comment: this.state.comment, user: this.props.user, avatar: this.props.user.avatar, username: this.props.user.username, yt_id: this.state.videoPick, id:this.state.videoPick, title: this.state.videoInfo.snippet.title, thumbnail: this.state.videoInfo.snippet.thumbnails.default.url })
          })
               .then(response => response.json())
               .then(data => {
                    this.setState({comment: ""})
                    this.props.history.push("/community_videos")
               })
                        
               }
               
               chooseVideo = (item) => {
                    this.setState({videoPick: item.id.videoId})
                    this.setState({videoInfo: item})
                 } 




     render(){
          return(
             <>
             <Background>
             <h1 style={{color: "red", fontFamily: "Helvetica", fontSize: "40px"}}>Search and Discuss New Content</h1>
              <FilmContainer> 
                   <FilmBox>
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url={`https://www.youtube.com/watch?v=${this.state.videoPick}`}
                 width= '100%'
                 height='100%'
                 controls={true}
                 />
               </PlayerWrapper>
               </FilmBox>
               </FilmContainer>

               <Form >
                 < TextArea style={{width: "700px", height: "50px", marginTop: "0px"}}  placeholder='Comments' name="comment" value={this.state.comment} onChange={this.changeHandler} /> 
                 <Button           
                               onClick={this.submitComment}
                               content='Add Comment'
                               labelPosition='right'
                               icon='pencil'
                              color='red'
                              position="right"
                              style={{marginTop: "0px", height: "50px" }}
                          />
                    </Form>


               <div className="vidGallery" style={{display: "flex", marginLeft: "250px", marginTop: "50px"}}> 
                 {this.props.videoList.map(item => (
                   <ul key={item.id.videoId}>
                     <div >
                       <b style={{color: "red"}} onClick={() => this.chooseVideo(item)}>{item.snippet.title}</b>
                     
                     </div>
                     <img  alt="" src={item.snippet.thumbnails.default.url}/>
                     </ul>
                 
                    
                 ))}
                 </div>
    
                 </Background>

</>
        
          )

     }


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
