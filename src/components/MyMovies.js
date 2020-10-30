import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components'

class MyMovies extends React.Component {

     goBack = () => {
          this.props.history.goBack()
        }
      

     render(){
          return(
          <div className="favePage">
               <Back> <Button color='orange' onClick={this.goBack}> Back to Browse</Button> </Back>
          
             <h1>My Movies</h1>
          </div>
               
     
          )


     }


}
export default MyMovies


const Back = styled.div`
text-align: right
`