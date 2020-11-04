import React from 'react';
import { Card, Grid, Container} from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';

class MovieCard extends React.Component {

   

    clickHandler = (e) => {
     // this.props.goToShow(this.props.movie)
     this.props.history.push(`movies/${this.props.movie.id}`)
}
   

   
    
    
 

     render() {

      
          return (
               <Background>
                    <CardWrapper>
                
            
                      
                          <Card raised image={`https://image.tmdb.org/t/p/w185${this.props.movie.poster_path}`} onClick={() => {this.clickHandler()}} />
                         <span onClick={() => {this.props.submitFavorite(this.props.movie)}} style={{fontSize: "70px", color: "red"}}>&#9760;</span>
                         <Card.Content>
                              {/* <Card.Header style={{color: "white"}}>{this.props.movie.title}</Card.Header> */}
                         </Card.Content> 
                         
                
                        
              {/* /* </Grid.Column> 
                </Grid>   */ }
             </CardWrapper>
                </Background>
                

          )

     }
}

export default withRouter(MovieCard)

const Background = styled.div`
background-color: black;
`

const CardWrapper = styled.div`
width: 100%;
display: inline-flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between


`