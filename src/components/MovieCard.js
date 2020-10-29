import React from 'react';

class MovieCard extends React.Component {

     render(){
 
          return(
          <h1>title:{this.props.movie.title} </h1>
          )

     }
}

export default MovieCard