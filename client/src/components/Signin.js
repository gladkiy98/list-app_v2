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
      password: '',
      errors: {},
      isSubmitted: false
    };
  }

  handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if(!this.state.username){
      formIsValid = false;
      errors['username'] = 'Username cannot be empty';
    }

    if(!this.state.password){
      formIsValid = false;
      errors['password'] = 'Password cannot be empty';
    }

    if(this.state.password.length < 8){
      formIsValid = false;
      errors['password_length'] = 'Password is too short (minimum is 8 characters)';
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (e) => {
    if(this.state.isSubmitted) {
      this.handleValidation();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    this.setState({isSubmitted: true});
    if(this.handleValidation()) {
      event.preventDefault();

      var formData = new FormData();
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
      fetch('http://localhost:3000/api/tokens',
        {method: 'POST', body: formData})
        .then(res => res.json()).then(res =>
        window.localStorage.setItem('jwt', res.jwt)
      )
        .then(() => this.props.history.push('/dashboard'));
    }
  }


  render() {
    return(
      <Container>
        <Col sm={{ size: SMALL_COLUMN_SIZE, offset: SMALL_OFFSET_SIZE }}>
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
                  <div className='error'>
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
                  <div className='error'>
                    {this.state.errors['password']}
                  </div>
                  <div className='error'>
                    {this.state.errors['password_length']}
                  </div>
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
  history: PropTypes.object.isRequired
};

export default SignIn;
