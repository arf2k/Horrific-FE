import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components'
import MovieCard from './MovieCard.js'

class MyMovies extends React.Component {

     // state = {
     //      favorites: []
     // }
     
     componentDidMount(){
         let token = localStorage.getItem("token")
          fetch('http://localhost:3001/my_movies', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
          .then(resp => resp.json())
          .then(data => {
               console.log(data)
          })
     }

     // renderFavorites = () => {
     //      return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)

     // }

     
     goBack = () => {
          this.props.history.goBack()
        }
      

     render(){
          return(
          <div className="favePage">
               <Back> <Button color='orange' onClick={this.goBack}> Back to Browse</Button> </Back>
          
             <h1>My Movies</h1>
               {/* {this.renderFavorites()} */}
          </div>
               
     
          )


     }


}
export default MyMovies


const Back = styled.div`
text-align: right
`