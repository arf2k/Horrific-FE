import React, {useEffect, useState} from 'react'
import { Form, TextArea, Button, Card } from 'semantic-ui-react'
import styled from 'styled-components'


const MovieShow = (props) => {
  
     
     const[ movie, setMovie] = useState([])



     // useEffect( () => {
     //      console.log("heeeyyyy")
     //      let token = localStorage.getItem("token")
     //      fetch(`http://localhost:3001/movies/${props.chosenMovie.id}`, {
     //           method: "GET",
     //           headers:
     //                { Authorization: `Bearer ${token}` }
     //      })
     //           .then(resp => resp.json())
     //           .then(data => {
     //                setMovie(data)
     
     //  })}, [props.chosenMovie.id])
               
     

      useEffect( () => {
          console.log("heeeyyyy")
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/movies/${props.match.params.movieId}`, {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    setMovie(data)
     
      })}, [props.movieId])
     

      const goBack = () => {
          props.history.goBack()
     }



     // submitReview = () => {

     // }

     // changeHandler 
     // const[name, setName] = useState("")
     
     

     


          return (
     
           <Back>  <Button color='red' onClick={goBack}> Back to Browse</Button>  </Back>

               // <div className="movieShow">
               //      <h1>{movie.title}</h1>
               
               //      <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
               
               //      <h3>{movie.overview}</h3>
               //  </div>
                
                   
                 /* <Form onSubmit={this.submitReview}>
                         <TextArea placeholder='Write a review' name="review" value={this.state.review} onChange={this.changeHandler} />
                         <Button
                              content='Add Review'
                              labelPosition='right'
                              icon='pencil'
                              primary
                         />
                    </Form>    */
               



          )

     


}

export default MovieShow

const Back = styled.div`
text-align: right
`