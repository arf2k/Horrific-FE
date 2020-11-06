import React, {useEffect, useState} from 'react';
import { Form, TextArea, Button, Card, Message, Image, Comment, Icon } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'

let api_key = process.env.REACT_APP_YT_API_KEY


const MovieShow = (props) => {
  
     
     const[ movie, setMovie] = useState([])

     const[receivedReview, setReceivedReview] = useState([])   

     const[videoList, setVideoList] = useState([])

     const[videoPick, setVideoPick] = useState([])

     const[review, setReview] = useState("")

      useEffect( () => {
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/movies/${props.match.params.movieId}`, {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                   setMovie(data.single_movie)
                   setReceivedReview(data.reviews)
     
      })}, [props.movieId])



     //  setmovieId on mount 


           const submitReview = () => {

               let token = localStorage.getItem("token")
               fetch(`http://localhost:3001/movies/${props.match.params.movieId}/reviews`, {
                    method: "POST",
                    headers: {
                         Authorization: `Bearer ${token}`,
                         "Accepts": "application/json",
                         "Content-type": "application/json"
                    },
                    body: JSON.stringify({ review: review, user: props.user, title: movie.title, username: props.user.username})
               })
                    .then(response => response.json())
                    .then(data => {
                       console.log(data)
                       
                    })
                             
                    }
                    

    const deleteReview = (reviewId) => {
          let token= localStorage.getItem("token")
          fetch(`http://localhost:3001/movies/${props.match.params.movieId}/reviews/${reviewId}`, {
               method: "DELETE",
               headers: 
               {Authorization: `Bearer ${token}`}
          })
          .then(resp => resp.json())
          .then(data => {console.log(data)
        })
     }


     const searchYoutube = () => {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${movie.title}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
                    setVideoList(data.items)
               })
     }


      const chooseVideo = (item) => {
          setVideoPick(item.id.videoId)
      }    
      
      const clickSearch = () => {
           searchYoutube()
      }

      const goBack = () => {
          props.history.goBack()
     }
                    
 
          return (

               <>
           <Back>  <Button color='red' class="small icon backward" onClick={goBack}> Rewind</Button>  </Back>

               <div className="movieShow">
                    <h1>{movie.title}</h1>
               
                    <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
               
                     <h3>{movie.overview}</h3>
                 </div>
                
              
                  <Form onSubmit={submitReview}>
                         <TextArea placeholder='Write a review' name="review" value={review} onChange={e => setReview(e.target.value)} />
                         <Button
                              content='Add Review'
                              labelPosition='right'
                              icon='pencil'
                              color='red'
                              position="right"
                         />
                    </Form>    
                  
                <h1>Reviews</h1>
               <div className="reviewsdiv">
                {
                     receivedReview.map(review => (
                         <>
                         <CommentFrame>
                         <Comment>
                         <Comment.Text  key={review.id} >{review.review} - {review.username} </Comment.Text>
                          <img src={`/${review.avatar}`} style={{ borderRadius: "20px" }} width="75px"/>
                         </Comment>
                         <i class="small delete icon" onClick={() => deleteReview(review.id)}/>
                         </CommentFrame> </>
                        ))} 
                        
                        </div>
          
                         
                    {/* {updateReview.review? 
                            <>
                            <CommentFrame>
                             <Comment>
                             <Comment.Text  key={updateReview.id} >{updateReview.review} - {updateReview.username} </Comment.Text>
                              <img src={`/${updateReview.avatar}`} style={{ borderRadius: "20px" }} width="75px"/>
                             </Comment>
                             <i class="small delete icon" onClick={() => deleteReview(updateReview.id)}/>
                             </CommentFrame> </>
                             
                       : null } */}
                       <div className="buttondiv">
                    
     <Button onClick={clickSearch} icon labelPosition='left'>Choose Videos<Icon name='play' /></Button> </div>

              <div className="viddiv">
               <ReactPlayer
                 style={{position: "absolute", top: "0", right: "0", paddingTop: "56.25%"}}
                 url= {`https://www.youtube.com/watch?v=${videoPick}`}
                 width= '50%'
                 height='50%'
                 controls={true}
                 />
          </div>
               
               <div className="vidGallery" style={{display: "inline-flex"}} >
             Click a video title to play
                 {videoList.map(item => (
                   <ul key={item.id.videoId}>
                     <div >
                       <b onClick={() => chooseVideo(item)}>{item.snippet.title}</b>
                     
                     </div>
                     <img  alt="" src={item.snippet.thumbnails.default.url}/>
                     </ul>
                    
                 ))}
                    </div>     
                         
                         


</>

          )
              
                }    
                



export default MovieShow

const Back = styled.div`
text-align: right
`

const CommentFrame = styled.div`
border-color: red;
border-style: inset;
border-width: 15px;
width: 350px;
background-color: #ffe;
margin: 0px auto;
display: inline-flex;
align-items: flex-end;
`
// const Background = styled.div`
// background-color: black;
// `


