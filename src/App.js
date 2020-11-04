import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Welcome from './components/Welcome.js';
import NavBar from './containers/NavBar.js';
import MovieContainer from './containers/MovieContainer.js'
import MyMovies from './components/MyMovies.js'
import MovieShow from './components/MovieShow.js'
import Signup from './components/Signup.js'
import MovieList from './components/MovieList.js'
import VideoPlayer from './containers/VideoPlayer.js'

const BASE_API = "http://localhost:3001/"

class App extends React.Component {


  state = {
    user: null
  }

  componentDidMount = () => {
    let token = localStorage.getItem("token")
    if (token) {
      fetch(BASE_API + "auth", {
        method: "GET",
        headers:
          { Authorization: `Bearer ${token}` }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          this.setState({ user: data.user })

        })
    }
  }


  loginHandler = (e) => {
    e.preventDefault()
    const username = (e.target.username.value)
    const password = e.target.password.value
    let user = { username, password }
    let configObj = {
      method: "POST",
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ user })
    }

    fetch(BASE_API + 'login', configObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user })
      })
  }

  signupHandler = (e, avatar) => {
    e.preventDefault()
    const username = (e.target.username.value)
    const password = e.target.password.value
    const passwordConfirmation = e.target.passwordConfirmation.value
    let user = { username, password, avatar }
    let configObj = {
      method: "POST",
      headers: {"accepts": "application/json",
      "content-type": "application/json"},
      body: JSON.stringify({user})
    }
    
    fetch(BASE_API + 'users', configObj)
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      console.log(data)
      this.setState({user: data.user})
    })
  }


  logout = () => {
    this.setState({user: null})
    localStorage.removeItem("token")
  }

  setUser = (newUser) => {
    
    return this.setState({user: newUser})

  }



  render() {
    return (
      <div className="App">
        <NavBar logout={this.logout}/>
      { this.state.user !== null ?
        <Switch>
            <Route path = "/movies/:movieId" render={(routerprops) => <MovieShow {...routerprops} user={this.state.user} /> } />
            <Route path = "/favorites" render={(routerprops) => <MyMovies {...routerprops} user={this.state.user}/> } />
            <Route path = "/search" render={(routerprops) => <MovieList {...routerprops} /> } />
            <Route path="/login" render={(routerprops) => <Welcome {...routerprops} user={this.state.user} loginHandler={this.loginHandler}/> } />
            <Route path="/signup" render={(routerprops) => <Signup {...routerprops}  signupHandler={this.signupHandler} /> } />
            <Route path="/movies" render={(routerprops) => <MovieContainer {...routerprops} user={this.state.user}/> }/>
            <Route path="/video_player" render= {(routerprops => <VideoPlayer {...routerprops} user={this.state.user} />)}/>
            <Route path="/" render={(routerprops) => <Welcome {...routerprops} user={this.state.user} loginHandler={this.loginHandler} setUser={this.setUser} /> } />
       </Switch>
       :
       <Switch>
          <Route path="/login" render={(routerprops) => <Login {...routerprops} loginHandler={this.loginHandler} />} />
          <Route path="/signup" render={(routerprops) => <Signup {...routerprops} signupHandler={this.signupHandler} />} />
          <Route path="/" render={(routerprops) => <Welcome {...routerprops} user={this.state.user} loginHandler={this.loginHandler} />}/>
       </Switch>
  }
      </div>
    );
  }
}

export default App;
