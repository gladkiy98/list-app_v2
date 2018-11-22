import React, { Component } from 'react';
import {
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
import Header from './Header';
import PropTypes from 'prop-types';
import * as size from '../constants/magicNumbers';
import axios from 'axios';
import '../stylesheets/signin.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
  }

  validate = () => {
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

    if (this.state.password.length < 8) {
      formIsValid = false;
      errors['password_length'] = 'Password is too short (minimum is 8 characters)';
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errors: {} });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      axios.post('/api/tokens', {
        username: this.state.username,
        password: this.state.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => localStorage.setItem('jwt', response.data.jwt))
      .then(() => this.props.history.push('/dashboard'));
    }
  }

  render() {
    return(
      <div className='signin'>
        <Header />
        <Container>
          <Col sm={{ size: size.SIZE_6, offset: size.SIZE_3 }}>
            <Card>
              <CardHeader className='signin-header'>Sign in</CardHeader>
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
                    <div className='text-danger'>
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
                    <div className='text-danger'>
                      {this.state.errors['password']}
                    </div>
                    <div className='text-danger'>
                      {this.state.errors['password_length']}
                    </div>
                  </FormGroup>
                  <button
                      className='signin-button'
                      onClick={this.handleSubmit}
                      type='button'>
                    Sign in
                  </button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object
};

SignIn.defaultProps = {
  history: {}
};

export default SignIn;
