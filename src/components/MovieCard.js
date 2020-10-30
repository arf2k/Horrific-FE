import React from 'react';
import { Card, Grid, GridRow } from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

class MovieCard extends React.Component {

    

 


     render() {
          return (
               <Grid container columns={3}>
                    <Grid.Column>
                         <Card raised image={`https://image.tmdb.org/t/p/w185${this.props.movie.poster_path}`}/>
                         <span onClick={() => {this.props.clickHandler(this.props.movie.id); this.props.history.push(`/movies/${this.props.movie.id}`) }} style={{fontSize: "70px"}}>&#9760;</span>
                         <Card.Content>
                              <Card.Header>{this.props.movie.title}</Card.Header>
                              <Card.Description>{this.props.movie.overview}</Card.Description>
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