import React, {useEffect, useState} from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'


const MovieShow = (props) => {
  
     
     // const[ movie, setMovie] = useState([])



     useEffect( () => {
          console.log("heeeyyyy")
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/movies/${props.chosenMovie.id}`, {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
     
      })}, [props.chosenMovie.id])
               
     

     
     
     
     
  
 


     // submitReview = () => {

     // }

     // changeHandler 
     // const[name, setName] = useState("")
     
     
     

     


          return (
               
                    <h1>Showpage</h1>

                    /* <Form onSubmit={this.submitReview}>
                         <TextArea placeholder='Write a review' name="review" value={this.state.review} onChange={this.changeHandler} />
                         <Button
                              content='Add Review'
                              labelPosition='right'
                              icon='pencil'
                              primary
                         />
                    </Form> */
               



          )

     


}

export default MovieShow