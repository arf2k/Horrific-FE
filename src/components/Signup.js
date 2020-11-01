import React, {useState} from 'react'
import { NavLink} from 'react-router-dom'
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'



function Signup(props){
    
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [passwordConfirmation, setPasswordConfirmation] = useState('')
     const [avatar, setAvatar] = useState('')
     const changeHandler = (e) => {
         switch (e.target.name) {
             case "username":
                 setUsername(e.target.value)
                 break;
             case "password":
                 setPassword(e.target.value)
                 break;
             case "passwordConfirmation":
                 setPasswordConfirmation(e.target.value)
                 break;
             case "avatar":
                 setAvatar(e.target.value)
                 break;
             default:
                 break;
         }
         
     }
     // const radioHandler = (e, result) => {
     //     setAvatar(result.value)
     // }
     const invalidPassword = (password !== passwordConfirmation && password !== "" && passwordConfirmation !== "")
 
     const pwValidation = (e)=>{
         if (invalidPassword){
             alert("Passwords Do Not Match")
         }else if (username === ""){
             alert("Must have a username")

         }
         
         else{
             return props.signupHandler(e)
         }
     }
     let result = <></>
     if (!localStorage.getItem("token")) {
     result = 
     <div>
         
         <div>Welcome!</div>
     <Grid textAlign='center' style={{ marginTop: '13vh' }} verticalAlign='middle'>
         <Grid.Column style={{ maxWidth: 450 }}>
             <Header as='h2' color='teal' textAlign='center'>
                     <Icon name="pencil" /> Sign Up! 
       </Header>
             <Form size='large' onSubmit={pwValidation}>
                 <Segment stacked>
                     <Form.Input fluid name="username" icon='user' iconPosition='left' placeholder='Username' onChange={changeHandler}/>
                     <Form.Input
                         fluid
                         name="password"
                         onChange={changeHandler}
                         icon='lock'
                         iconPosition='left'
                         placeholder='Password'
                         type='password'
                     />
                     <Form.Input
                         fluid
                         onChange={changeHandler}
                         name="passwordConfirmation"
                         icon='lock'
                         iconPosition='left'
                         placeholder='Password Confirmation'
                         type='password'
                     />
                         {invalidPassword ? <Message size="tiny" color='red'>Passwords do not match</Message> : null} 
 
                     <Button color='red' fluid size='large'>
                        Get spooked!
           </Button>
                 </Segment>
             </Form>
             <Message>
                     Already a Member? <NavLink to="/login">Login</NavLink>
             </Message>
         </Grid.Column>
    </Grid> 
     </div>
    
   }
       return (
           result)
     }
 


 export default Signup