import React from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login.js';


class Welcome extends React.Component {


     render(){

          return(
               this.props.user? <h1>Hellooooo</h1>: <Login history={this.props.history} loginHandler={this.props.loginHandler}/> 

          )
     }



}
export default withRouter(Welcome); 