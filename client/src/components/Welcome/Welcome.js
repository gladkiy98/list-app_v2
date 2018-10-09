/* eslint-disable react/jsx-no-literals */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import { SIZE_6, SIZE_3 } from '../../constants/magic-numbers';
class Welcome extends Component{
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/signin' />;
    }
  };

  render() {
    return(
      <Container className='welcome'>
        <Row>
          <Col>
            <h1>hello</h1>
          </Col>
          <Col sm={{ size: SIZE_6, offset: SIZE_3}}>{this.renderRedirect()}
            <Button color="secondary" onClick={this.handleRedirect}>
              Signin
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Welcome;
