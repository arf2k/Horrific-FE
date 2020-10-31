import React from 'react';
import { Button, Grid, Card } from 'semantic-ui-react';
import styled from 'styled-components'


class MyMovies extends React.Component {

     state = {
          favorites: []
     }

     componentDidMount() {
          let token = localStorage.getItem("token")
          fetch('http://localhost:3001/my_movies', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    this.setState({ favorites: data })
               })
     }

     goBack = () => {
          this.props.history.goBack()
     }


     // favoriteCard = () => {
     //      const favorites = [this.state.favorites]
     //    return (
     //         <>
     //         {favorites.map((favorite) => (
     //    <Grid >
     //    <Grid.Column>
     //         <Card raised image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`} />
     //         <Card.Content>
     //              <Card.Header>{favorite.title}</Card.Header>
     //              <Card.Description>{favorite.overview}</Card.Description>
     //         </Card.Content>
     //    </Grid.Column>
     //    </Grid>   
     //         ))}
     //         </>
     //    )
     //    }
     
     
     render() {

          const favorites = this.state.favorites

          return (
               <div className="favePage">
                    <Back> <Button color='orange' onClick={this.goBack}> Back to Browse</Button> </Back>

                    <h1>My Movies</h1>
                    
                    {favorites.map((favorite) => (
        <Grid >
        <Grid.Column>
             <Card raised image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`} />
             <Card.Content>
                  <Card.Header>{favorite.title}</Card.Header>
                  <Card.Description>{favorite.overview}</Card.Description>
             </Card.Content>
        </Grid.Column>
        </Grid>   
             ))}
            
        )
        }
                    




               </div>
          )



     }
}
export default MyMovies


const Back = styled.div`
text-align: right
`