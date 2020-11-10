import React, {useEffect, useState} from 'react';
import { Form, TextArea, Button, Card, Message, Image, Comment, Icon } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import styled from 'styled-components'

let api_key = process.env.REACT_APP_YT_API_KEY

// class MovieShow extends React.Component {
const MovieShow = (props) => {
  
     
     const[ movie, setMovie] = useState([])

     const[receivedReview, setReceivedReview] = useState([])   

     const[videoList, setVideoList] = useState([])

     const[videoPick, setVideoPick] = useState([])

     const[review, setReview] = useState("")
     
     // state= {
     //      movie : [],
     //      receivedReview : [],
     //      review: ""

     // }

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

     //  [props.movieId]
//      componentDidMount ()  {
//           let token = localStorage.getItem("token")
//           fetch(`http://localhost:3001/movies/${this.props.match.params.movieId}`, {
//                method: "GET",
//                headers:
//                     { Authorization: `Bearer ${token}` }
//           })
//                .then(resp => resp.json())
//                .then(data => {
//                     console.log(data)
//                    this.setState({movie: data.single_movie})
//                   this.setState({receivedReview: data.reviews})
     
//      })
// }






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
                    //    updateReviews()
                       
                    })
                             
                    }
                    
                    

                    // submitReview(){
             
                    //      let token = localStorage.getItem("token")
                    //      fetch(`http://localhost:3001/movies/${this.state.movie.id}/reviews`, {
                    //           method: "POST",
                    //           headers: {
                    //                Authorization: `Bearer ${token}`,
                    //                "Accepts": "application/json",
                    //                "Content-type": "application/json"
                    //           },
                    //           body: JSON.stringify({ review: this.state.review, user: this.props.user, title: this.state.movie.title, username: this.props.user.username})
                    //      })
                    //           .then(response => response.json())
                    //           .then(data => {
                    //              console.log(data)
                    //                this.updateReviews()
                                 
                    //           })
                                   
                    //           }


                              const updateReviews = () => {
                                   let token = localStorage.getItem("token")
                              fetch(`http://localhost:3001/movies/${props.match.params.movieId}`, {
                                   method: "GET",
                                   headers:
                                        { Authorization: `Bearer ${token}` }
                              })
                                   .then(resp => resp.json())
                                   .then(data => {
                                        setReceivedReview(data.reviews)
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


     // deleteReview = (reviewId) => {
     //      let token= localStorage.getItem("token")
     //      fetch(`http://localhost:3001/movies/${this.props.match.params.movieId}/reviews/${reviewId}`, {
     //           method: "DELETE",
     //           headers: 
     //           {Authorization: `Bearer ${token}`}
     //      })
     //      .then(resp => resp.json())
     //      .then(data => {console.log(data)
     //           this.update()
     //    })
     // }




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
                    

 
     // changeHandler = (e) => {

     //           this.setState({review : e.target.value})
     //      }

     
     // render() {

          return (

               <>
                <Background>
           <Back>  <Button color='red' onClick={goBack}> Rewind</Button>  </Back>

                 <div className="movieShow">
                     {/* <h1>{movie.title}</h1>  */}
          
                    <img alt="" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
               
                      <h3 style={{color: "red", width: "800px", margin: "auto"}}>{movie.overview}</h3>
                 </div> 
                
              
                     <Form >
                 < TextArea style={{width: "900px", marginTop: "50px"}}  placeholder='Write a review' name="review" value={review} onChange={e => setReview(e.target.value)} /> 
                    </Form>    
                          <Button  
                               onClick={submitReview}
                               content='Add Review'
                               labelPosition='right'
                               icon='pencil'
                              color='red'
                              position="right"
                          /> 

  
                            {/* <Form >
                         < TextArea style={{width: "900px", marginTop: "50px"}}  placeholder='Write a review' name="review" value={this.state.review} onChange={this.changeHandler} /> 
                        </Form>    
                        <Button
                                  onClick={this.submitReview}
                                  content='Add Review'
                                  labelPosition='right'
                                  icon='pencil'
                                  color='red'
                                  position="right"
          
                             />    */}


                   
                 <h1>Reviews</h1>
                <div className="reviewsdiv">
                 { 
                      receivedReview.map(review => (
                          <>
                          <CommentFrame>
                     <Comment >
                         <Comment.Text style={{color: "red", flexWrap: "wrap", marginLeft: "50px"}} key={review.id} >{review.review} - {review.username} </Comment.Text>
                          <img alt="" src={`/${review.avatar}`} style={{display: "flex", marginTop: "-50px"}} width ="55px"/>
                         </Comment>
                          <i style={{marginInlineStart: "auto"}} class="small delete icon" onClick={() => deleteReview(review.id)}/>
                         </CommentFrame> </>
                         ))} 
                        
                        </div> 


            
                        <h1>Reviews</h1>
                        {/* <div className="reviewsdiv">
                         {
                              this.state.receivedReview.map(review => (
                                  <>
                                  <CommentFrame>
                                  <Comment >
                                  <Comment.Text  key={review.id} >{review.review} - {review.username} </Comment.Text>
                                   <img src={`/${review.avatar}`} style={{display: "flex"}} width="75px"/>
                                  </Comment>
                                  <i style={{marginInlineStart: "auto"}} class="small delete icon" onClick={() => this.deleteReview(review.id)}/>
                                  </CommentFrame> </>
                                 ))} 
                                 
                                 </div> */}




          
                         
              
                    
        <div className="buttondiv"> <Button onClick={clickSearch} icon labelPosition='left'>Clips & Trailers<Icon name='play' /></Button> </div>
         <FilmContainer> 
           <FilmBox>
           <PlayerWrapper>
               <ReactPlayer 
                style={{position: "absolute", top: "0", left: "0", transform: "none"}}
                  url= {`https://www.youtube.com/watch?v=${videoPick}`}
                  width= '100%'
                  height= '100%'
                 controls={true}
                  />
                </PlayerWrapper>
           </FilmBox>
          </FilmContainer> 
               
                <div className="vidGallery" style={{display: "inline-flex"}} >
              Click a video title to play
                  {videoList.map(item => (
                    <ul key={item.id.videoId}>
                      <div style={{color: "red"}} >
                        <b  onClick={() => chooseVideo(item)}>{item.snippet.title} </b>
                     
                      </div>
                    <img  alt="" src={item.snippet.thumbnails.default.url}/>
                      </ul>
                    
                 ))}
                    </div>       
                         
                         
                     </Background> 

</>

          )   
              
                  }

     


export default MovieShow

const Back = styled.div`
text-align: right
`


const CommentFrame = styled.div`
border-color: red;
border-style: ridge;
border-width: 5px;
width: 400px;
height: 100px;
background-color: #343A40;
margin: 10px auto;
display: grid;
align-items: flex-end;

`



const Background = styled.div`
background-color: black;
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