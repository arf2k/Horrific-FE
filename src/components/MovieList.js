import React from 'react';
import MovieCard from './MovieCard.js'
import SearchForm from './SearchForm.js'
import styled from 'styled-components'
import { Grid, Container } from 'semantic-ui-react'

class MovieList extends React.Component {
     
     state = {
          searchTerm: ""
     }


     
 
     renderSearch = () => {
        
          return this.props.movies.filter(movie =>  movie.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())).map(movie => <MovieCard key={movie.id} movie={movie} submitFavorite={this.props.submitFavorite} goToShow={this.props.goToShow} />)
     }

   searchChangeHandler = (e) => {

        this.setState({searchTerm : e.target.value})
   }

     
     render() {
          return(
               <>
               <Background>
                
               <SearchForm searchTerm={this.state.searchTerm} searchChangeHandler={this.searchChangeHandler} />    
           <MyContainer>
                {this.renderSearch()}
              </MyContainer>
 
               </Background>
               </>
          )
     }
}


export default MovieList


const Background = styled.div`
background-color: black;
`

const MyContainer = styled.section`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-content: center;
margin-top: 10vh;
margin-left: 15vw;

`