/* eslint-disable react/jsx-no-literals */
import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
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
import { SIZE_6, SIZE_3 } from '../../constants/magic-numbers';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      errors: {},
      isSubmitted: false,
      errorExist: '',
      exist: true
    };
  }

  handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.username) {
      formIsValid = false;
      errors['username'] = 'Username cannot be empty';
    }

    if (!this.state.password) {
      formIsValid = false;
      errors['password'] = 'Password cannot be empty';
    }

    if (!this.state.password_confirmation) {
      formIsValid = false;
      errors['password_confirmation'] = 'Password confirmation cannot be empty';
    }

    if (this.state.password_confirmation !== this.state.password) {
      formIsValid = false;
      errors['password_confirmation_equal'] = 'Password confirmation must be equal to Password';
    }

    if (this.state.password.length < 8) {
      formIsValid = false;
      errors['password_length'] = 'Password is too short (minimum is 8 characters)';
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleChange = (e) => {
    if (this.state.isSubmitted) {
      this.handleValidation();
    }
    this.setState({ [e.target.name]: e.target.value, exist: true, errorExist: ''});
  }

  handleSubmit = () => {
    this.setState({ isSubmitted: true });
    if (this.handleValidation()) {
      axios.post('/api/users', { user: {
        'username': this.state.username,
        'password': this.state.password,
        'password_confirmation': this.state.password_confirmation }
      })
      .catch(error => {
        this.setState({ errorExist: error.response.data.errors, exist: false });
      })
      .then(() => {
        if (this.state.exist) {
          this.props.history.push('/');
        }
      });
    }
  }

  render() {
    return(
      <div className='signup'>
        <Header />
        <Container>
          <Col sm={{ size: SIZE_6, offset: SIZE_3 }}>
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
                    <div className='error'>
                      {this.state.errors['username']}
                    </div>
                    <div className='error'>
                      {this.state.errorExist}
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
                    <div className='error'>
                      {this.state.errors['password']}
                    </div>
                    <div className='error'>
                      {this.state.errors['password_length']}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password Confirmation</Label>
                    <Input
                        id='password_confirmation'
                        name='password_confirmation'
                        onChange={this.handleChange}
                        placeholder="Password Confirmation"
                        type='password'
                        value={this.state.password_confirmation} />
                    <div className='error'>
                      {this.state.errors['password_confirmation']}
                    </div>
                    <div className='error'>
                      {this.state.errors['password_confirmation_equal']}
                    </div>
                  </FormGroup>
                  <Button onClick={this.handleSubmit}>Sign up</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object
};

export default SignUp;
