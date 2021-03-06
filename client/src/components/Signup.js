/* eslint-disable react/jsx-no-literals */
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
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import * as size from '../constants/magicNumbers';
import '../stylesheets/signup.scss';
import Api from '../lib/api';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      errors: {},
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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, exist: true, errorExist: '', errors: { [target.name]: null } });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleValidation()) {
      Api.Signup.post({ user: {
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
          <Col sm={{ size: size.SIZE_6, offset: size.SIZE_3 }}>
            <Card>
              <CardHeader className='signup-header'>
                <FormattedMessage defaultMessage="Sign up" id="nav.signup" />
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="username">
                      <FormattedMessage defaultMessage="Username" id="nav.username" />
                    </Label>
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
                    <div className='text-danger'>
                      {this.state.errorExist}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">
                      <FormattedMessage defaultMessage="Password" id="nav.password" />
                    </Label>
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
                  <FormGroup>
                    <Label for="password">
                      <FormattedMessage defaultMessage="Password confirmation" id="nav.password_confirmation" />
                    </Label>
                    <Input
                        id='password_confirmation'
                        name='password_confirmation'
                        onChange={this.handleChange}
                        placeholder="Password Confirmation"
                        type='password'
                        value={this.state.password_confirmation} />
                    <div className='text-danger'>
                      {this.state.errors['password_confirmation']}
                    </div>
                    <div className='text-danger'>
                      {this.state.errors['password_confirmation_equal']}
                    </div>
                  </FormGroup>
                  <button
                      className='signup-button'
                      onClick={this.handleSubmit}
                      type='button'>
                    <FormattedMessage defaultMessage="Sign up" id="nav.signup" />
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

SignUp.propTypes = {
  history: PropTypes.object
};

export default SignUp;
