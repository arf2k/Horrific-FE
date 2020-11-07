import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import styled from 'styled-components'


class MyMovies extends React.Component {

     state = {
          favorites: [],
          reviews: [],
          iconShown: false
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
                    this.setState({ favorites: data.favorites, reviews: data.reviews })
               })
     }


                  
     updateFavorites  () {
          let token = localStorage.getItem("token")
     fetch('http://localhost:3001/my_movies', {
          method: "GET",
          headers:
               { Authorization: `Bearer ${token}` }
     })
          .then(resp => resp.json())
          .then(data => {
               this.setState({ favorites: data.favorites})
          })
     }



     goBack = () => {
          this.props.history.goBack()
     }

     deleteFavorite = (favoriteId) => {
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/users/favorites/${favoriteId}`, {
               method: "DELETE",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    this.updateFavorites()
               })
     }
                    
     
     render() {

          const favorites = this.state.favorites
          const reviews = this.state.reviews

          return (
               <>
 <Background>
                    <Back> <Button labelPosition="right" color='red'  icon="fast backward" onClick={this.goBack}> Rewind </Button> </Back>

                    <h1 style={{ color: "red" }}>My Movies</h1>
                    <MyContainer>
                   
                         {favorites.map(favorite => (
                              <> <i class="small delete icon" onClick={() => this.deleteFavorite(favorite.id)} />
                                   <Card onClick={() => this.props.history.push(`/movies/${favorite.movie_id}`)} key={favorite.id} raised image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`} /> </>))

                         }

                    </MyContainer>

                    <h1 style={{ color: "red" }}>My Reviews</h1>

                    {reviews.map(review => (
                         <p style={{ color: "red" }} onClick={() => this.props.history.push(`/movies/${review.movie_id}`)} key={review.id}>{review.title} : {review.review}  </p>

                    ))}

</Background>

               </>
          )



     }
}
export default MyMovies


const Back = styled.div`
text-align: right
`

const Background = styled.div`
background-color: black

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


const CardWrapper = styled.div`
width: 100%;
display: inline-flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between


`