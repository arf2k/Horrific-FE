import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'
import {Button, Icon, Form, TextArea} from 'semantic-ui-react'

let api_key = process.env.REACT_APP_YT_API_KEY

class VideoPlayer extends React.Component {

     state = {
          comment: ""
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
               body: JSON.stringify({ comment: this.state.comment, user: this.props.user, avatar: this.props.user.avatar, username: this.props.user.username, yt_id: this.props.videoPick, id:this.props.videoPick})
          })
               .then(response => response.json())
               .then(data => {
                  console.log(data)
                  
               })
                        
               }
               



     render(){
          return(
             <>
               <h1>Community Videos- inside the videoplayer</h1>
              <FilmContainer> 
                   <FilmBox>
               <PlayerWrapper>
               <ReactPlayer
                 style={{position: "absolute", top: "0", left: "0"}}
                 url={`https://www.youtube.com/watch?v=${this.props.videoPick}`}
                 width= '100%'
                 height='100%'
                 controls={true}
                 />
               </PlayerWrapper>
               </FilmBox>
               </FilmContainer>

               <Form >
                 < TextArea style={{width: "900px", marginTop: "50px"}}  placeholder='Comments' name="comment" value={this.state.comment} onChange={this.changeHandler} /> 
                    </Form>    
                          <Button  
                               onClick={this.submitComment}
                               content='Add Review'
                               labelPosition='right'
                               icon='pencil'
                              color='red'
                              position="right"
                          /> 


    
           
</>
        
          )

     }


}

export default VideoPlayer




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
