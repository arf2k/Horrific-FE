import './App.css';
import { Route, Switch } from 'react-router-dom'
import React from 'react'
import Login from './components/Login.js'
import Welcome from './components/Welcome.js'
import NavBar from './containers/NavBar.js'

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
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user })
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
        <Switch>
            <Route path="/login" render={(routerprops) => <Welcome {...routerprops} user={this.state.user}/> } />
       
       </Switch>
      </div>
    );
  }
}

export default App;
