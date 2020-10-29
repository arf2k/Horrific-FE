import React from 'react';
import MovieList from '../components/MovieList.js'

class MovieContainer extends React.Component {


     state = {
          
          api: []
     }

     componentDidMount = () => {
          let token = localStorage.getItem("token")
          fetch('http://localhost:3001/movies', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                   
                    this.setState({ api: data.items} )
               })
          }

     render(){
          console.log(this.state.api)
          return(
               <MovieList movies={this.state.api} />
          )


     }

}
export default MovieContainer 