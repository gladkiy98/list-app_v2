import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Col
} from 'reactstrap';
import EditableLabel from 'react-inline-editing';
import { SIZE_8, SIZE_2 } from '../../constants/magic-numbers';

class ListContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      title: '',
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

  handleChange = (e) => {
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
    .then((response) => response);
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
    );
  }

  handleCreateList = () => {
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
    });
  }

  render() {
    return(
      <Container className='list'>
        <Col sm={{ size: SIZE_8, offset: SIZE_2 }}>
          <Form>
            <FormGroup>
              <Input
                  id='title'
                  name='title'
                  onChange={this.handleChange}
                  placeholder='Title'
                  value={this.state.title} />
            </FormGroup>
            <Button
                id='listbutton'
                onClick={this.handleCreateList}>Add List</Button>
          </Form>
        </Col>
        <Col sm={{ size: SIZE_8, offset: SIZE_2 }}>
          { _.orderBy(this.state.lists, ['id'], ['desc']).map((list, i) => {
            return (
              <div className="single-list" id='listok' key={list.id}>
                <EditableLabel onFocusOut={this.handleFocus(list)} text={list.title} />
                <Button
                    onClick={this.handleDestroyList(i, list)}
                    outline
                    size="sm">
                  Delete
                </Button>
              </div>
            );
          }) }
        </Col>
      </Container>
    );
  }
}
  // this.state.lists.sort((a, b) => b.id - a.id )
export default ListContainer;
