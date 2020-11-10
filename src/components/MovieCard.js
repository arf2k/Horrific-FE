import React from 'react';
import { Card} from 'semantic-ui-react';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';
import {NavLink} from 'react-router-dom'

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
                        <span onClick={() => {this.props.submitFavorite(this.props.movie)}} style={{fontSize: "70px", color: "red", marginTop: "5px"}}>&#9760;</span>
                         <Card.Content>
                         </Card.Content> 
                         
             {/* *****   z index******** */}
                        
            
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