import React from 'react';
import MovieCard from './MovieCard.js'

class MovieList extends React.Component {
     

     renderMovies = () => {
          return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
     }
     
     render() {
          return(
              <div>
                {this.renderMovies()}
               </div>
          )
     }
}

export default MovieList