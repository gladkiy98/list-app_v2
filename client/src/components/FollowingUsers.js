import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default class FollowingUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <tr key={this.props.i} >
        <td>#{this.props.i+1}</td>
        <td> {this.props.user.username}</td>
        <td>
          <Button
              className='unfollow'
              onClick={this.props.unFollow(this.props.i,this.props.user)}>Unfollow
          </Button>
        </td>
      </tr>
    );
  }
}

FollowingUsers.propTypes = {
  i: PropTypes.number,
  unFollow:PropTypes.func,
  user: PropTypes.object
};
