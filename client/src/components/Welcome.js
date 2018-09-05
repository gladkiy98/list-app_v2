/* eslint-disable react/jsx-no-literals */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import { SMALL_COLUMN_SIZE, SMALL_OFFSET_SIZE } from '../constants/magic-numbers';
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
      <Container>
        <Row>
          <Col sm={{ size: SMALL_COLUMN_SIZE, offset: SMALL_OFFSET_SIZE}}>{this.renderRedirect()}
            <Button color="secondary" onClick={this.handleRedirect}>
              Sign in
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Welcome;
