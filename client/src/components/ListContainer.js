import React, { Component } from 'react';
import axios from 'axios';
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
import {NotificationContainer, NotificationManager} from 'react-notifications';
import '../stylesheets/lists.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class ListContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      title: '',
      errors: {}
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('jwt');
    axios.get('/api/lists.json', {
      headers: {
        'Authorization' : token
      }
    })
    .then(response => {
      this.setState({
        lists: response.data
      });
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

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  handleChange = (e) => {
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFocus = (list) => (text) => {
    list.title = text;
    let token = localStorage.getItem('jwt');
    axios.put(`/api/lists/${list.id}`, { 'title': list.title },
      {
        headers: {
          'Authorization': token,
        }
      })
    .then((response) => response)
    .then(this.createNotification('edit'));
  }

  handleDestroyList = (i, list) => () => {
    const lists = [...this.state.lists];
    lists.splice(i, 1);
    this.setState({ lists });
    let token = localStorage.getItem('jwt');
    axios.delete(`/api/lists/${list.id}`,
      {
        headers: {
          'Authorization' : token
        }
      }
    )
    .then(this.createNotification('delete'));
  }

  handleCreateList = (e) => {
    e.preventDefault();
    if (this.validateList()) {
      let token = localStorage.getItem('jwt');
      axios.post('/api/lists', { list: { 'title': this.state.title } },
        {
          headers: {
            'Authorization' : token
          }
        }
      )
      .then(response => {
        const lists = [ ...this.state.lists, response.data ];
        this.setState({ lists });
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
            {this.state.lists.map((list, i) => {
              return(
                <CSSTransition
                    classNames="fade"
                    key={i}
                    timeout={500}>
                  <ListItem
                      createNotification={this.createNotification}
                      i={i}
                      key={list.id}
                      list={list}
                      onHandleDestroyList={this.handleDestroyList}
                      onHandleFocus={this.handleFocus} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </Col>
        <NotificationContainer />
      </Container>
    );
  }
}

export default ListContainer;
