import React from 'react';
import { Card, Grid, GridRow } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';

class MovieCard extends React.Component {

   

    clickHandler = (e) => {
     this.props.goToShow(this.props.movie)
     this.props.history.push(`movies/${this.props.movie.id}`)
}
   


    
    
 

     render() {
          return (
               <Grid container columns={3}>
                    <Grid.Column>
                         <Card raised image={`https://image.tmdb.org/t/p/w185${this.props.movie.poster_path}`} onClick={() => {this.clickHandler()}} />
                         <span onClick={() => {this.props.submitFavorite(this.props.movie)}} style={{fontSize: "70px"}}>&#9760;</span>
                         <Card.Content>
                              <Card.Header>{this.props.movie.title}</Card.Header>
                              {/* <Card.Description>{this.props.movie.overview}</Card.Description> */}
                         </Card.Content>
                    </Grid.Column>
               </Grid>
          


          )

     }
}

export default withRouter(MovieCard)

const MyCards = styled.div`
display: list-item,

`