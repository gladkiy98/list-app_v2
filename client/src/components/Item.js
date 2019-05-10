import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/creatableInput.scss';
import { Col, Row } from 'reactstrap';
import * as size from '../constants/magicNumbers';

const Item = (props) => (
  <Row className='single-item'>
    <Col className='item-content'>
      {props.item.content}
    </Col>
    <Col sm={{ offset: size.SIZE_1 }}>
      <button
          className='destroy-item'
          onClick={props.onHandleDestroyItem(props.index, props.item)}
          type='button'>
        Delete
      </button>
    </Col>
  </Row>
);

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onHandleDestroyItem: PropTypes.func
};

export default Item;
