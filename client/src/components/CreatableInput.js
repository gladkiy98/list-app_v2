import React, { Component } from 'react';
import axios from 'axios';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import '../stylesheets/creatableInput.css';
import {
  Col,
  Row
} from 'reactstrap';
import api from '../lib/api';

export default class CreatableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      items: []
    };
  }

  componentDidMount = () => {
    api.get(`lists/${this.props.list.id}`)
    .then(response => {
      this.setState({
        items: response.data
      });
    });
  }

  promiseOptions = (inputValue, callback) => {
    let token = localStorage.getItem('jwt');
    axios.get('/api/items',
      {
        params: {inputValue}
      },
      {
        headers: {
          'Authorization' : token
        }
      }
    )
    .then(response => {
      let items = response.data;
      let result = [];
      items.map((option) => {
        return (
          result.push({label: option, value: option})
        );
      });
      const requestResults = result;
      callback(requestResults);
    });
  }

  handleCreateItem = (event) => {
    event.preventDefault();
    api.post('items',
      { 'content': this.state.selectedOption.value ,
        list_id: this.props.list.id
      }
    )
    .then(response => {
      const items = [ ...this.state.items, response.data ];
      this.setState({ items });
    });
  }

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  handleDestroyItem = (i, item) => () => {
    const items = [...this.state.items];
    items.splice(i, 1);
    this.setState({ items });
    api.destroy(`items/${item.id}`);
  };

  render() {
    return (
      <div>
        <Col>
          <AsyncCreatableSelect
              className='async_creatable'
              isClearable
              loadOptions={this.promiseOptions}
              onChange={this.handleChange('selectedOption')}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  this.handleCreateItem(event);
                }
              }}
              value={this.state.selectedOption} />
          <button
              className='create_item'
              id='button'
              onClick={this.handleCreateItem}
              type='button'>
            +
          </button>
        </Col>
        <TransitionGroup className="all_items">
          {this.state.items.map((item, i) => {
            return(
              <CSSTransition
                  classNames="fade"
                  key={item.id}
                  timeout={700}>
                <Row className='single_item' key={item.id}>
                  <Col className='item_content'>
                    {item.content}
                  </Col>
                  <Col sm={{ offset: 1 }}>
                    <button
                        className='destroy_item'
                        onClick={this.handleDestroyItem(i, item)}
                        type='button'>
                      Delete
                    </button>
                  </Col>
                </Row>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
}

CreatableInput.propTypes = {
  list: PropTypes.object
};
