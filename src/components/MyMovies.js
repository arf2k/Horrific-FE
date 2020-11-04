import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
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
                    console.log(data)
                    this.setState({ favorites: data.favorites, reviews: data.reviews })
               })
     }

     componentDidUpdate(prevState) {
          if (this.state.favorites !== prevState.favorites) {
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
                    console.log(data)
                    // window.alert("movie deleted")
               })
     }






     // onMouseOver={this.showDelete} onMouseLeave={this.normal} 
     render() {

          const favorites = this.state.favorites
          const reviews = this.state.reviews

          return (
               <>
                    <div className="favePage">
                         <Back> <Button color='red' icon="fast backward" onClick={this.goBack}> Rewind </Button> </Back>

                         <h1>My Movies</h1>
                         <div className="movies" style={{ display: "inline-flex" }} >
                              {favorites.map(favorite => (
                                   <> <i class="small delete icon" onClick={() => this.deleteFavorite(favorite.id)} />
                                        <Card onClick={() => this.props.history.push(`/movies/${favorite.movie_id}`)} key={favorite.id} raised image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`} /> </>))

                              }




                         </div>

                         <h1>My Reviews</h1>

                         {reviews.map(review => (
                              <p onClick={() => this.props.history.push(`/movies/${review.movie_id}`)} key={review.id}>{review.title} : {review.review}  </p>

                         ))}

                    </div>

               </>
          )



     }
}
export default MyMovies


const Back = styled.div`
text-align: right
`