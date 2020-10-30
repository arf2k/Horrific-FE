import React from 'react'


class MovieShow extends React.Component {

     // componentDidMount = () => {
     //      let token = localStorage.getItem("token")
     //      console.log(this.props)
     //      fetch(`http://localhost:3001/movies/${this.props.chosenMovie}`, {
     //           method: "GET",
     //           headers:
     //                { Authorization: `Bearer ${token}` }
     //      })
     //           .then(resp => resp.json())
     //           .then(data => {
     //                console.log(data)
     //           })
     //      }

          render(){
               console.log(this.props.chosenMovie)
               return(
                    <>
               <h1>Showpage</h1>
               <p>{this.props.chosenMovie}</p>
               </>
               )

          }


}

export default MovieShow