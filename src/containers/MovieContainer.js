import React from 'react';
import MovieList from '../components/MovieList.js'
import MovieShow from '../components/MovieShow.js'
import MyMovies from '../components/MyMovies.js'

class MovieContainer extends React.Component {


     state = {

          api: [],
  
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

                    this.setState({ api: data })
               })
     }

     submitFavorite = (movieObj) => {
          // this.setState({ favorite : movieObj})

          let token = localStorage.getItem("token")
          fetch("http://localhost:3001/users/favorites", {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Accepts": "application/json",
                    "Content-type": "application/json"
               },
               body: JSON.stringify({ movie: movieObj, user: this.props.user })
          })
               .then(response => response.json())
               .then(data => {console.log(data)})
               }
     

   





     render() {
          return (
               <>
                    <MovieList movies={this.state.api} submitFavorite={this.submitFavorite} />

               </>

          )


     }

}
export default MovieContainer 