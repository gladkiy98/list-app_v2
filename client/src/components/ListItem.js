import React, { Component } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import EditableLabel from 'react-inline-editing';
import * as size from '../constants/magicNumbers';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import '../stylesheets/items.scss';
import CreatableInput from './CreatableInput';

class ListItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: ''
    };
  }

  handleOpen = (param = false) => () => {
    this.setState({ open: param });
  }

  render() {
    return(
      <Row className="single-list">
        <Col sm={{ size: size.SIZE_1 }}>
          {this.props.index + 1}
        </Col>
        <Col sm={{ size: size.SIZE_3 }}>
          <div className='title-label'>
            <EditableLabel onFocusOut={this.props.onHandleFocus(this.props.list)} text={this.props.list.title} />
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
          {!this.state.open ?
            <button
                className='create-item'
                onClick={this.handleOpen(true)}
                type='button'>
              + item
            </button> :
            <button
                className='close-button'
                onClick={this.handleOpen(false)}
                type='button'>
              close
            </button> }
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
        </Col>
        }
      </Row>
    );
  }
}

ListItem.propTypes = {
  createNotification: PropTypes.func,
  index: PropTypes.number,
  list: PropTypes.object,
  onHandleDestroyList: PropTypes.func,
  onHandleFocus: PropTypes.func
};

export default ListItem;
