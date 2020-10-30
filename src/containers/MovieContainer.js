import React from 'react';
import MovieList from '../components/MovieList.js'
import MovieShow from '../components/MovieShow.js'

class MovieContainer extends React.Component {


     state = {
          
          api: [],
          chosenMovie: []
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

          // renderMovieClick = (id) => {
          //     this.setState({chosenMovie : id })
          // }

        

     render(){
          // console.log(this.state.chosenMovie)
          return(
               <>
               <MovieList movies={this.state.api} clickHandler={this.renderMovieClick}/>
               {/* <MovieShow chosenMovie={this.state.chosenMovie}/> */}
               </>
           
          )


     }

}
export default MovieContainer 