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
import api from '../lib/api';
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
    api.getList(this.props.list.id)
    .then((response) => {
      this.setState({
        items: response.data
      });
    });
  }

  loadOptions = (inputValue, callback) => {
    api.getItems({inputValue})
    .then((response) => {
      let items = response.data;
      let result = [];
      _.forEach(items, function(option) {
        result.push({ label: option, value: option });
      });
      callback(result);
    });
  }

  handleCreateItem = (event) => {
    event.preventDefault();
    api.postItem(
      { 'content': this.state.selectedOption.value ,
        list_id: this.props.list.id
      }
    )
    .then((response) => {
      const items = [ ...this.state.items, response.data ];
      this.setState({ items });
    });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleDestroyItem = (i, item) => () => {
    const items = [...this.state.items];
    items.splice(i, 1);
    this.setState({ items });
    api.destroyItem(item.id);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleCreateItem(e);
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
                onChange={this.handleChange}
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
          {this.state.items.map((item, i) => {
            return(
              <CSSTransition
                  classNames="fade"
                  key={item.id}
                  timeout={700}>
                <Item
                    index={i}
                    item={item}
                    onHandleDestroyItem={this.handleDestroyItem} />
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

export default CreatableInput;
