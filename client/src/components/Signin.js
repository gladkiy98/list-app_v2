import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  Container,
  Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { SMALL_COLUMN_SIZE, SMALL_OFFSET_SIZE } from '../constants/magic-numbers';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    var formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);

    fetch('http://localhost:3000/api/tokens',
      {method: 'POST', body: formData})
      .then(res => res.json()).then(res => (console.log(res.jwt),
      window.localStorage.setItem('jwt', res.jwt)
    ))
      .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return(
      <Container>
        <Col sm={{ size: SMALL_COLUMN_SIZE, offset: SMALL_OFFSET_SIZE}}>
          <Card>
            <CardHeader>Sign in</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                      id='username'
                      name='username'
                      onChange={this.handleChange}
                      placeholder="Username"
                      type='username'
                      value={this.state.username} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                      id='password'
                      name='password'
                      onChange={this.handleChange}
                      placeholder="Password"
                      type='password'
                      value={this.state.password} />
                </FormGroup>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.string.isRequired
};

export default SignIn;
