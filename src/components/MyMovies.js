import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import styled from 'styled-components'


class MyMovies extends React.Component {

     state = {
          favorites: [],
          reviews: []
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

     goBack = () => {
          this.props.history.goBack()
     }





     render() {

          const favorites = this.state.favorites
          const reviews = this.state.reviews

          return (
               <div className="favePage">
                    <Back> <Button color='red' onClick={this.goBack}> Back to Browse</Button> </Back>

                    <h1>My Movies</h1>
                    <div className="movies" style={{ display: "list-item" }}>
                         {favorites.map(favorite => (
                              <Card onClick={() => this.props.history.push(`/movies/${favorite.movie_id}`)}  key={favorite.id} raised image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`} />))
                         }

                     <h1>My Reviews</h1>
                    {reviews.map(review => (
                         <p>{review.title} : {review.review} </p>
                    ))} 
                    



                    </div>
               </div>
          )



     }
}
export default MyMovies


const Back = styled.div`
text-align: right
`