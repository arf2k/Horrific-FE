import React from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'


class MovieShow extends React.Component {


     state = {
          review : ""
     }

     // componentDidMount = () => {
     //      let token = localStorage.getItem("token")
     //      fetch(`http://localhost:3001${this.props.location.pathname}`, {
     //           method: "GET",
     //           headers:
     //                { Authorization: `Bearer ${token}` }
     //      })
     //           .then(resp => resp.json())
     //           .then(data => {
     //                console.log(data)
     //           })
     // }

     submitReview = () => {

     }

     changeHandler = (e) =>{
          this.setState({[e.target.name]: e.target.value})
     }

     render() {
          console.log(this.props)
          return (
               <>
                    <h1>Showpage</h1>

                    <Form onSubmit={this.submitReview}>
                         <TextArea placeholder='Write a review' name="review" value={this.state.review} onChange={this.changeHandler} />
                         <Button
                              content='Add Review'
                              labelPosition='right'
                              icon='pencil'
                              primary
                         />
                    </Form>
               </>



          )

     }


}

export default MovieShow