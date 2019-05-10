import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import '../stylesheets/header.scss';
import Api from '../lib/api';

class SignedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
    };
  }

  componentDidMount() {
    Api.Username.get()
    .then((response) => {
      this.setState({ username: response.data });
    });
  }

  render() {
    return(
      <UncontrolledDropdown inNavbar nav>
        <DropdownToggle caret nav>
          <FormattedMessage defaultMessage="Hi" id="nav.hi" />, {this.state.username}
        </DropdownToggle>
        <DropdownMenu id="dropdown" right>
          <DropdownItem>
            <FormattedMessage defaultMessage="Settings" id="nav.settings" />
          </DropdownItem>
          <DropdownItem>
            <Link className='main-link' to="/dashboard" >
              <FormattedMessage defaultMessage="Main" id="nav.mainpage" />
            </Link>
          </DropdownItem>
          <DropdownItem divider />
          {this.props.renderRedirect()}
          <DropdownItem onClick={this.props.onHandleClearStorage}>
            <FormattedMessage defaultMessage="Logout" id="nav.logout" />
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

SignedIn.propTypes = {
  onHandleClearStorage: PropTypes.func,
  renderRedirect: PropTypes.func
};

export default SignedIn;
