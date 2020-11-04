import React from 'react';
import MovieCard from './MovieCard.js'
import SearchForm from './SearchForm.js'
import styled from 'styled-components'

class MovieList extends React.Component {
     
     state = {
          searchTerm: ""
     }


     // renderMovieCards = () => {
     //      debugger
     //      return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} submitFavorite={this.props.submitFavorite} goToShow={this.props.goToShow} />)
     // }
 
     renderSearch = () => {
        
          return this.props.movies.filter(movie =>  movie.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map(movie => <MovieCard key={movie.id} movie={movie} submitFavorite={this.props.submitFavorite} goToShow={this.props.goToShow} />)
     }

   searchChangeHandler = (e) => {

        this.setState({searchTerm : e.target.value})
   }

     
     render() {
          return(
               <Background>
                
               <SearchForm searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} />    
                {/* {this.renderMovieCards()} */}
                {this.renderSearch()}
              
               </Background>
          )
     }
}


export default MovieList


const Background = styled.div`
background-color: black;
`