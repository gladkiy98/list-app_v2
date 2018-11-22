import React from 'react';
import {
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import '../stylesheets/header.scss';

const NotSignedIn = () => {
  return (
    <Nav>
      <NavItem>
        <Link to="/signup">
          <button
              className='header-signup'
              type='button'>
            <FormattedMessage defaultMessage="Signup" id="nav.signup" />
          </button>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/">
          <button
              className='header-signin'
              type='button'>
            <FormattedMessage defaultMessage="Signin" id="nav.signin" />
          </button>
        </Link>
      </NavItem>
    </Nav>
  );
};

export default NotSignedIn;
