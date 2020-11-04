import React, {useEffect, useState} from 'react'
import { Form, TextArea, Button, Card, Message, Image } from 'semantic-ui-react'
import styled from 'styled-components'


const MovieShow = (props) => {
  
     
     const[ movie, setMovie] = useState([])

     const[receivedReview, setReceivedReview] = useState([])   
     
     const[newReview, setNewReview] = useState([])
     

      useEffect( () => {
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/movies/${props.match.params.movieId}`, {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
                   setMovie(data.single_movie)
                   setReceivedReview(data.reviews)
     
      })}, [props.movieId])
     

      const goBack = () => {
          props.history.goBack()
     }


     
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
               


     const[review, setReview] = useState("")

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
                              primary
                         />
                    </Form>    
                  
                <h1>Reviews</h1>
               
                {receivedReview.map(review => (
                     
                       <>  <Message key={review.id} size="massive">{review.review} - {review.username} <img src={review.avatar}/></Message>
                         <i class="small delete icon" onClick={() => deleteReview(review.id)}/></>
                ))}

</>

          )
              
                }    
                



export default MovieShow

const Back = styled.div`
text-align: right
`