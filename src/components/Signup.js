import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Form, Grid, Header, Icon, Message, Segment, Radio } from 'semantic-ui-react'
import styled from 'styled-components'



function Signup(props) {

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
    const radioHandler = (e, result) => {
        console.log(result.value)
        setAvatar(result.value)
    }
    const invalidPassword = (password !== passwordConfirmation && password !== "" && passwordConfirmation !== "")



    const pwValidation = (e) => {
        if (invalidPassword) {
            alert("Passwords Do Not Match")
        } else if (username === "") {
            alert("Must have a username")
        } else if (avatar === "") {
            alert("Must have an avatar")
        }
        else {
            return props.signupHandler(e, avatar)
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
                                <Form.Input fluid name="username" icon='user' iconPosition='left' placeholder='Username' onChange={changeHandler} />
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
                <Avatars>
                    <Choose>
                        <Avatar src={'assets/avatars/MichaelMyers.jpg'} />
                        <Radio
                            label='Michael Myers'
                            name='avatar'
                            value='assets/avatars/MichaelMyers.jpg'
                            checked={avatar === 'assets/avatars/MichaelMyers.jpg'}
                            onChange={radioHandler}
                            style={{ fontSize: "18px", marginTop: "15px" }}
                        />
                    </Choose>
                    <Choose>
                        <Avatar src={'assets/avatars/Carrie.jpg'} />
                        <Radio
                            label='Carrie'
                            name='avatar'
                            value='assets/avatars/Carrie.jpg'
                            checked={avatar === 'assets/avatars/Carrie.jpg'}
                            onChange={radioHandler}
                            style={{ fontSize: "18px", marginTop: "15px" }}
                        />
                    </Choose>
                    <Choose>
                        <Avatar src={'assets/avatars/Jason.jpg'} />
                        <Radio
                            label='Jason Voorhees'
                            name='avatar'
                            value='assets/avatars/Jason.jpg'
                            checked={avatar === 'assets/avatars/Jason.jpg'}
                            onChange={radioHandler}
                            style={{ fontSize: "18px", marginTop: "15px" }}
                        />
                    </Choose>
                    <Choose>
                        <Avatar src={'assets/avatars/Freddy.jpg'} />
                        <Radio
                            label='Freddy Krueger'
                            name='avatar'
                            value='assets/avatars/Freddy.jpg'
                            checked={avatar === 'assets/avatars/Freddy.jpg'}

                            onChange={radioHandler}
                            style={{ fontSize: "18px", marginTop: "15px" }}
                        />
                    </Choose>
                    <Choose>
                        <Avatar src={'assets/avatars/Pinhead.jpg'} />
                        <Radio
                            label='Pinhead'
                            name='avatar'
                            value='assets/avatars/Pinhead.jpg'
                            checked={avatar === 'assets/avatars/Pinhead.jpg'}

                            onChange={radioHandler}
                            style={{ fontSize: "18px", marginTop: "15px" }}
                        />
                    </Choose>
                    <Choose>
                        <Avatar src={'assets/avatars/Ghostface.jpg'} />
                        <Radio
                            label='Ghostface'
                            name='avatar'
                            value='assets/avatars/Ghostface.jpg'
                            checked={avatar === 'assets/avatars/Ghostface.jpg'}

                            onChange={radioHandler}
                            style={{ fontSize: "18px", marginTop: "15px" }}
                        />
                    </Choose>
                </Avatars>
                <span style={{ fontSize: "1em" }}>Pick your Villain </span>
            </div>
    } else {
        props.history.push("/")
    }
    return (
        result)
}



export default Signup

const Avatars = styled.div`
    margin: 170px auto;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    width: 70%;
    flex-wrap: wrap;
    align-content: stretch;
`
const Choose = styled.div`
`

const Avatar = styled.img`
    display:block;
    width: 160px;
    height: 220px;
    z-index: 10;
    position: relative;
    `