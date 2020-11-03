import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList.js'
import MovieShow from '../components/MovieShow.js'


const MovieContainer = (props) => {




     const [api, setApi] = useState([])
     const [chosenMovie, setChosenMovie] = useState(null)


     useEffect(() => {
          let token = localStorage.getItem("token")
          fetch('http://localhost:3001/movies', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    // console.log(data)
                    setApi(data)
               })
     }, [])




     const submitFavorite = (movieObj) => {

          let token = localStorage.getItem("token")
          fetch("http://localhost:3001/users/favorites", {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Accepts": "application/json",
                    "Content-type": "application/json"
               },
               body: JSON.stringify({ movie: movieObj, user: props.user })
          })
               .then(response => response.json())
               .then(data => { console.log(data) })
     }


     const goToShow = (movieObj) => {
          return setChosenMovie(movieObj)
     }


     console.log(api)

     return (
          
          <>
               <MovieList movies={api} submitFavorite={submitFavorite} goToShow={goToShow} />
              

               {chosenMovie ? <MovieShow chosenMovie={chosenMovie} /> : null}

          </>

     )




}
export default MovieContainer 