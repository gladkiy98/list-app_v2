import React, { Component } from 'react';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import PropTypes from 'prop-types';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import '../stylesheets/creatableInput.scss';
import {
  Col,
  Row
} from 'reactstrap';
import Api from '../lib/api';
import * as size from '../constants/magicNumbers';
import Item from './Item';
import _ from 'lodash';

class CreatableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      items: []
    };
  }

  componentDidMount() {
    Api.List.show(this.props.list.id)
    .then((response) => {
      this.setState({ items: response.data });
    });
  }

  loadOptions = (inputValue, callback) => {
    Api.Item.get({ inputValue })
    .then((response) => {
      const items = response.data;
      let result = [];
      _.forEach(items, (option) => {
        result.push({ label: option, value: option });
      });
      callback(result);
    });
  }

  handleCreateItem = (event) => {
    event.preventDefault();
    Api.Item.post({
      content: this.state.selectedOption.value,
      list_id: this.props.list.id
    })
    .then((response) => {
      const items = [...this.state.items, response.data];
      this.setState({ items });
    });
  }

  handleChange = (name) => (value) => {
    this.setState({ [name]: value });
  }

  handleDestroyItem = (index, item) => () => {
    let items = [...this.state.items];
    items.splice(index, 1);
    this.setState({ items });
    Api.Item.destroy(item.id);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleCreateItem(event);
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={{ size: size.SIZE_10 }}>
            <AsyncCreatableSelect
                className='async-creatable'
                isClearable
                loadOptions={this.loadOptions}
                name='selectedOption'
                onChange={this.handleChange('selectedOption')}
                onKeyDown={this.handleKeyDown}
                value={this.state.selectedOption} />
          </Col>
          <button
              className='new-item'
              id='button'
              onClick={this.handleCreateItem}
              type='button'>
            +
          </button>
        </Row>
        <TransitionGroup className="all-items">
          {this.state.items.map((item, index) => (
            <CSSTransition
                classNames="fade"
                key={item.id}
                timeout={700}>
              <Item
                  index={index}
                  item={item}
                  onHandleDestroyItem={this.handleDestroyItem} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

CreatableInput.propTypes = {
  list: PropTypes.object.isRequired
};

export default CreatableInput;
