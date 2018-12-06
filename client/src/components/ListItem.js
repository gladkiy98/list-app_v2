import React, { Component } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import * as size from '../constants/magicNumbers';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import '../stylesheets/items.scss';
import CreatableInput from './CreatableInput';
import Editable from 'react-x-editable';

class ListItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: ''
    };
  }

  handleOpen = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  }

  render() {
    return(
      <Row className="single-list">
        <Col sm={{ size: size.SIZE_1 }}>
          {this.props.index + 1}
        </Col>
        <Col sm={{ size: size.SIZE_3 }}>
          <div className='title-label'>
            <Editable
                dataType='text'
                handleSubmit={this.props.onHandleEdit(this.props.list)}
                mode={'inline'}
                showButtons={'true'}
                value={this.props.list.title} />
          </div>
        </Col>
        <Col>
          <div className='create-date'>
            <FormattedDate
                day="numeric"
                month="long"
                value={new Date(this.props.list.createdAt)}
                year="numeric" />
          </div>
        </Col>
        <Col>
          <button
              className={this.state.open ? 'close-button' : 'create-item'}
              onClick={this.handleOpen}
              type='button'>
            {this.state.open ? 'close' : '+ item'}
          </button>
          <button
              className='delete-list'
              onClick={this.props.onHandleDestroyList(this.props.index, this.props.list)}
              type='button'>
            - list
          </button>
        </Col>
        {this.state.open &&
        <Col className='open-item' sm={{ size: size.SIZE_8, offset: size.SIZE_2 }}>
          <div className='creatable-input'>
            <CreatableInput
                createNotification={this.props.createNotification}
                list={this.props.list} />
          </div>
        </Col>}
      </Row>
    );
  }
}

ListItem.propTypes = {
  createNotification: PropTypes.func,
  index: PropTypes.number,
  list: PropTypes.object.isRequired,
  onHandleDestroyList: PropTypes.func,
  onHandleEdit: PropTypes.func
};

export default ListItem;
