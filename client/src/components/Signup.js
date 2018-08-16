/* eslint-disable react/jsx-no-literals */
import React, { Component } from 'react';
import axios from 'axios';
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: ''
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = () => {
    axios.post('http://localhost:3000/api/users', {user: {
      'username': this.state.username,
      'password': this.state.password,
      'password_confirmation': this.state.password_confirmation }
    })
      .then(() => this.props.history.push('/signin'));
  }

  render() {
    return(
      <Container>
        <Col sm={{ size: SMALL_COLUMN_SIZE, offset: SMALL_OFFSET_SIZE}}>
          <Card>
            <CardHeader>Sign up</CardHeader>
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
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                      id='password_confirmation'
                      name='password_confirmation'
                      onChange={this.handleChange}
                      placeholder="Password Confirmation"
                      type='password'
                      value={this.state.password_confirmation} />
                </FormGroup>
                <Button onClick={this.handleSubmit}>Sign up</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.string.isRequired
};

export default SignUp;
