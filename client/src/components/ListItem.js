import React, { Component } from 'react';
import {
  Col,
  Row
} from 'reactstrap';
import EditableLabel from 'react-inline-editing';
import { SIZE_8, SIZE_2, SIZE_1, SIZE_3 } from '../constants/magic-numbers';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import '../stylesheets/items.css';
import CreatableInput from './CreatableInput';

class ListItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      content: ''
    };
  }

  handleCreateItemForm = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    return(
      <Row className="single_list" key={this.props.list.id}>
        <Col sm={{ size: SIZE_1 }}>
          {this.props.i + 1}
        </Col>
        <Col sm={{ size: SIZE_3 }}>
          <div className='title_label'>
            <EditableLabel onFocusOut={this.props.onHandleFocus(this.props.list)} text={this.props.list.title} />
          </div>
        </Col>
        <Col>
          <div className='create_date'>
            <FormattedDate
                day="numeric"
                month="long"
                value={new Date(this.props.list.created_at)}
                year="numeric" />
          </div>
        </Col>
        <Col>
          <button
              className='create_item'
              onClick={this.handleCreateItemForm}
              type='button'>
            + item
          </button>
          <button
              className='delete_list'
              onClick={this.props.onHandleDestroyList(this.props.i, this.props.list)}
              type='button'>
            - list
          </button>
        </Col>
        {this.state.open &&
        <Col className='open_item' sm={{ size: SIZE_8, offset: SIZE_2 }}>
          <div className='creatable_input'>
            <CreatableInput
                createNotification={this.props.createNotification}
                list={this.props.list} />
          </div>
          <button
              className='close_button'
              onClick={this.handleClose}
              type='button'>
              Close
          </button>
        </Col>
        }
      </Row>
    );
  }
}

ListItem.propTypes = {
  createNotification: PropTypes.func,
  i: PropTypes.number,
  list: PropTypes.object,
  onHandleDestroyList: PropTypes.func,
  onHandleFocus: PropTypes.func
};

export default ListItem;
