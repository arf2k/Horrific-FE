import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { Background } from "./LoginStyles";

const Login = ({ loginHandler }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  let result = <></>;
  if (!localStorage.getItem("token")) {
    result = (
      <Background>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header
              style={{ fontFamily: "Helvetica", fontSize: "30px" }}
              as="h2"
              color="red"
              textAlign="center"
            >
              Log in to your account
            </Header>
            <Form size="large" onSubmit={loginHandler}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  onChange={changeHandler}
                  value={username}
                  name="username"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={password}
                />

                <Button color="red" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <NavLink to="/signup">Sign Up</NavLink>
            </Message>
          </Grid.Column>
        </Grid>
      </Background>
    );
  }
  return result;
};

export default Login;
