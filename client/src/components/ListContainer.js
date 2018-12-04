import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Container,
  Col,
  Row
} from 'reactstrap';
import * as size from '../constants/magicNumbers';
import ListItem from './ListItem';
import 'react-notifications/lib/notifications.css';
import '../stylesheets/lists.scss';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { NotificationContainer } from 'react-notifications';
import notifications from '../lib/notifications';
import Api from '../lib/api';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      title: '',
      errors: {}
    };
  }

  componentDidMount() {
    Api.List.get()
    .then((response) => {
      this.setState({ lists: response.data });
    });
  }

  validateList = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.title) {
      formIsValid = false;
      errors['title_length'] = 'Title cannot be empty (minimum is 1 character)';
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value, errors: {} });
  }

  handleEdit = (list) => (target) => {
    Api.List.put(list.id, { 'title': target.value })
    .then(notifications.createNotification('edit'));
  }

  handleDestroyList = (index, list) => () => {
    let lists = [...this.state.lists];
    lists.splice(index, 1);
    this.setState({ lists });
    Api.List.destroy(list.id)
    .then(notifications.createNotification('delete'));
  }

  handleCreateList = (event) => {
    event.preventDefault();
      if (this.validateList()) {
      Api.List.post({ list: { 'title': this.state.title } })
      .then((response) => {
        const lists = [ ...this.state.lists, response.data ];
        this.setState({ lists });
      })
      .then(notifications.createNotification('success'));
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleCreateList(event);
    }
  }

  render() {
    return(
      <Container className='list'>
        <Col sm={{ size: size.SIZE_8, offset: size.SIZE_2 }}>
          <Form>
            <FormGroup>
              <Row>
                <Col sm={{ size: size.SIZE_10 }}>
                  <Input
                      className='title-input'
                      id='title'
                      name='title'
                      onChange={this.handleChange}
                      onKeyDown={this.handleKeyDown}
                      placeholder='Add List'
                      value={this.state.title} />
                  <div className='text-danger'>
                    {this.state.errors['title_length']}
                  </div>
                </Col>
                <Col sm={{ size: size.SIZE_2 }}>
                  <button
                      className='create-list'
                      id='list_button'
                      onClick={this.handleCreateList}
                      type='button'>
                    +
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </Col>
        <Col sm={{ size: size.SIZE_8, offset: size.SIZE_2 }}>
          <Row className="table-header">
            <Col sm={{ size: size.SIZE_1 }}>#</Col>
            <Col sm={{ size: size.SIZE_3 }}>List name</Col>
            <Col>Create date</Col>
            <Col>Actions</Col>
          </Row>
          <TransitionGroup className="todo-list">
            {this.state.lists.sort((a, b) => (b.id - a.id)).map((list, index) => (
              <CSSTransition
                  classNames="fade"
                  key={list.id}
                  timeout={500}>
                <ListItem
                    createNotification={this.createNotification}
                    index={index}
                    key={list.id}
                    list={list}
                    onHandleDestroyList={this.handleDestroyList}
                    onHandleEdit={this.handleEdit} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Col>
        <NotificationContainer />
      </Container>
    );
  }
}

export default ListContainer;
