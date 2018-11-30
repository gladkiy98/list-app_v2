import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const FollowingUsers = (props) => (
  <tr key={props.i} >
    <td>#{props.i+1}</td>
    <td>{props.user.username}</td>
    <td>
      <Button            
          className='unfollow'
          onClick={props.unFollow(props.i,props.user)}>
        Unfollow
      </Button>
    </td>
  </tr>
);

FollowingUsers.propTypes = {
  i: PropTypes.number.isRequired,
  unFollow: PropTypes.func.isRequired,
  user: PropTypes.object
};

FollowingUsers.defaultProps = {
  user: {}
};

export default FollowingUsers;
