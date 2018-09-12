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
      password_confirmation: '',
      errors: {}
    };
  }

  handleValidation = () => {
    let errors = {};

    if(!this.state.username){
      errors['username'] = 'Username cannot be empty';
    }

    if(!this.state.password){
      errors['password'] = 'Password cannot be empty';
    }

    if(!this.state.password_confirmation){
      errors['password_confirmation'] = 'Password confirmation cannot be empty';
    }

    if(this.state.password_confirmation !== this.state.password){
      errors['password_confirmation_equal'] = 'Password confirmation must be equal to Password';
    }

    if(this.state.password.length < 8){
      errors['password_length'] = 'Password is too short (minimum is 8 characters) '
    }

    this.setState({errors: errors});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = () => {
    if(this.handleValidation()){
      axios.post('http://localhost:3000/api/users', {user: {
        'username': this.state.username,
        'password': this.state.password,
        'password_confirmation': this.state.password_confirmation }
      })
        .then(() => this.props.history.push('/'));
    }
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
                  <div className='username_error'>
                    {this.state.errors['username']}
                  </div>
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
                  {this.state.errors['password']}
                  {this.state.errors['password_length']}
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
                  {this.state.errors['password_confirmation']}
                  {this.state.errors['password_confirmation_equal']}
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
  history: PropTypes.object.isRequired
};

export default SignUp;
