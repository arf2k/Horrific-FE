import React from 'react';
import MovieList from '../components/MovieList.js'
import MovieShow from '../components/MovieShow.js'


class MovieContainer extends React.Component {


     state = {

          api: [],
          chosenMovie: ""
  
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
     

          goToShow = (movieId) => {
               this.setState({chosenMovie : movieId})
          }

     



     render() {
          console.log(this.state.chosenMovie)
          return (
               <>
                    <MovieList movies={this.state.api} submitFavorite={this.submitFavorite} goToShow={this.goToShow}  />
                    <MovieShow chosenMovie={this.state.chosenMovie} allMovies={this.state.api} />

               </>

          )


     }

}
export default MovieContainer 