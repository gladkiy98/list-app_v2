import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = (props) => {
  return (
    <tr >
      <td>#{props.user.id}</td>
      <td>
        <Link
            className='username'
            onClick={props.onHandleShowLists(props.user)}
            to='/userlist'>
          {props.user.username}
        </Link>
      </td>
      <td><Button className='follow' onClick={props.follow(props.user)}>Follow</Button></td>
    </tr>
  );
};

User.propTypes = {
  follow: PropTypes.func,
  onHandleShowLists: PropTypes.func,
  user: PropTypes.object
};

export default User;
