import React, { Component } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import PropTypes from 'prop-types';

class Items extends Component {
  render() {
    return(
      <Row className='single_item' key={this.props.item.id}>
        <Col className='item_content'>
          {this.props.item.content}
        </Col>
        <Col sm={{ offset: 1 }}>
          <button
              className='destroy_item'
              onClick={this.props.onHandleDestroyItem(this.props.i, this.props.item)}
              type='button'>
            Delete
          </button>
        </Col>
      </Row>
    )
  }
}

Items.propTypes = {
  i: PropTypes.number,
  item: PropTypes.object,
  onHandleDestroyItem: PropTypes.func
}

export default Items;
