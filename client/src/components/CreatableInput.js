import React, { Component } from 'react';
import axios from 'axios';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import '../stylesheets/creatableInput.css';
import {
  Col
} from 'reactstrap';
import api from '../lib/api';
import { connect } from 'react-redux';
import * as action from '../actions/itemsAction';
import PropTypes from 'prop-types';
import Items from './Items';

class CreatableInput extends Component {
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
      this.props.loadItems(response.data);
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
      this.props.addItem(response.data);
    });
  }

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  };

  handleDestroyItem = (i, item) => () => {
    this.props.destroyItem(i);
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
          {this.props.items.map((item, i) => {
            return(
              <CSSTransition
                  classNames="fade"
                  key={item.id}
                  timeout={700}>
                <Items
                    onHandleDestroyItem={this.handleDestroyItem}
                    i={i}
                    key={item.id}
                    item={item}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
}

CreatableInput.propTypes = {
  addItem: PropTypes.func,
  destroyItem: PropTypes.func,
  items: PropTypes.array,
  list: PropTypes.object,
  loadItems: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    items: state.currentUserItems.items
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadItems: data => dispatch(action.loadItems(data)),
    addItem: data => dispatch(action.addItem(data)),
    destroyItem: index => dispatch(action.destroyItem(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatableInput);
