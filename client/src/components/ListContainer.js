import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Container,
  Col,
  Row
} from 'reactstrap';
import { SIZE_8, SIZE_2, SIZE_1, SIZE_3 } from '../constants/magic-numbers';
import ListItem from './ListItem';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import '../stylesheets/lists.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import api from '../lib/api';
import { connect } from 'react-redux';
import * as action from '../actions/listsAction';
import PropTypes from 'prop-types';

class ListContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {}
    };
  }

  componentDidMount() {
    api.get('lists.json')
    .then(response => {
      this.props.loadLists(response.data);
    });
  }

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'success':
          NotificationManager.success('Succesfully created');
          break;
        case 'delete':
          NotificationManager.success('Succesfully deleted');
          break;
        case 'edit':
          NotificationManager.success('Succesfully updated');
          break;
        default:
          break;
      }
    };
  };

  validateList = () => {
    let errors = {};
    let formIsValid = true;

    if (this.state.title.length < 1) {
      formIsValid = false;
      errors['title_length'] = 'Title cannot be empty (minimum is 1 character)';
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleChange = (e) => {
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFocus = (list) => (text) => {
    list.title = text;
    api.put(`lists/${list.id}`, { 'title': list.title })
    .then(this.createNotification('edit'));
  }

  handleDestroyList = (i, list) => () => {
    this.props.destroyList(i);
    api.destroy(`lists/${list.id}`)
    .then(this.createNotification('delete'));
  }

  handleCreateList = (e) => {
    e.preventDefault();
    if (this.validateList()) {
      api.post('lists', { list: { 'title': this.state.title } })
      .then(response => {
        this.props.addList(response.data);
      })
      .then(this.createNotification('success'));
    }
  }

  render() {
    return(
      <Container className='list'>
        <Col sm={{ size: SIZE_8, offset: SIZE_2 }}>
          <Form>
            <FormGroup>
              <Row>
                <Col sm={{ size: 10 }}>
                  <Input
                      className='title_input'
                      id='title'
                      name='title'
                      onChange={this.handleChange}
                      onKeyDown={event => {
                        if (event.key === 'Enter') {
                          this.handleCreateList(event);
                        }
                      }}
                      placeholder='Add List'
                      value={this.state.title} />
                  <div className='text-danger'>
                    {this.state.errors['title_length']}
                  </div>
                </Col>
                <Col sm={{ size: SIZE_2 }}>
                  <button
                      className='create_list'
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
        <Col sm={{ size: SIZE_8, offset: SIZE_2 }}>
          <Row className="table_header">
            <Col sm={{ size: SIZE_1 }}>#</Col>
            <Col sm={{ size: SIZE_3 }}>List name</Col>
            <Col>Create date</Col>
            <Col>Actions</Col>
          </Row>
          <TransitionGroup className="todo-list">
            {this.props.lists.sort((a, b) => (b.id - a.id)).map((list, i) => (
              <CSSTransition
                  classNames="fade"
                  key={list.id}
                  timeout={500}>
                <ListItem
                    createNotification={this.createNotification}
                    i={i}
                    key={list.id}
                    list={list}
                    onHandleDestroyList={this.handleDestroyList}
                    onHandleFocus={this.handleFocus} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Col>
        <NotificationContainer />
      </Container>
    );
  }
}

ListContainer.propTypes = {
  addList: PropTypes.func,
  destroyList: PropTypes.func,
  lists: PropTypes.array,
  loadLists: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    lists: state.currentUserLists.lists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addList: data => dispatch(action.addList(data)),
    loadLists: data => dispatch(action.loadLists(data)),
    destroyList: i => dispatch(action.destroyList(i))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
