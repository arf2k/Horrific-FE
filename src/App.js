import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login.js";
import NavBar from "./containers/nav-bar/NavBar.js";
import MovieContainer from "./containers/movie-container/MovieContainer.js";
import MyMovies from "./components/my-movies/MyMovies.js";
import MovieShow from "./components/movie-show/MovieShow.js";
import Signup from "./components/sign-up/Signup.js";
import MovieList from "./components/movie-list/MovieList.js";
import VideoContainer from "./containers/video-container/VideoContainer.js";
import VideoPlayback from "./components/community-videos/VideoPlayback.js";

const BASE_API = "http://localhost:3001/";

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(BASE_API + "auth", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ user: data.user });
        });
    }
  };

  loginHandler = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    let user = { username, password };
    let configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    };

    fetch(BASE_API + "login", configObj)
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        this.setState({ user: data.user });
      });
  };

  signupHandler = (e, avatar) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    let user = { username, password, avatar };
    let configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user }),
    };

    fetch(BASE_API + "users", configObj)
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        this.setState({ user: data.user });
      });
  };

  logout = () => {
    this.setState({ user: null });
    localStorage.removeItem("token");
  };

  setUser = (newUser) => {
    return this.setState({ user: newUser });
  };

  render() {

    return (
      <div className="App">
        <NavBar logout={this.logout} />
        {this.state.user !== null ? (
          <Switch>
            <Route
              path="/movies/:movieId"
              render={(routerprops) => (
                <MovieShow {...routerprops} user={this.state.user} />
              )}
            />
            <Route
              path="/favorites"
              render={(routerprops) => (
                <MyMovies {...routerprops} user={this.state.user} />
              )}
            />
            <Route
              path="/search"
              render={(routerprops) => <MovieList {...routerprops} />}
            />
            <Route
              path="/login"
              render={(routerprops) => (
                <MyMovies
                  {...routerprops}
                  user={this.state.user}
                  loginHandler={this.loginHandler}
                />
              )}
            />
            <Route
              path="/signup"
              render={(routerprops) => (
                <Signup {...routerprops} signupHandler={this.signupHandler} />
              )}
            />
            <Route
              path="/movies"
              render={(routerprops) => (
                <MovieContainer {...routerprops} user={this.state.user} />
              )}
            />
            <Route
              path="/video_search"
              render={(routerprops) => (
                <VideoContainer {...routerprops} user={this.state.user} />
              )}
            />
            <Route
              path="/community_videos"
              render={(routerprops) => (
                <VideoPlayback {...routerprops} user={this.state.user} />
              )}
            />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/login"
              render={(routerprops) => (
                <Login {...routerprops} loginHandler={this.loginHandler} />
              )}
            />
            <Route
              path="/signup"
              render={(routerprops) => (
                <Signup {...routerprops} signupHandler={this.signupHandler} />
              )}
            />
            <Route
              path="/movies"
              render={(routerprops) => (
                <MovieContainer
                  {...routerprops}
                  user={this.state.user}
                  loginHandler={this.loginHandler}
                />
              )}
            />
          </Switch>
        )}
      </div>
    );
  }
}

export default App;
