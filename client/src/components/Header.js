import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Button
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { setLocale } from '../actions/changeLocale';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as action from '../actions/changeLocale';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: undefined,
      redirect: false,
      signedIn: false
    };
  }

  componentWillMount = (id) => {
    if (localStorage.getItem('jwt')) {
      this.setState({ signedIn: true });
      let token = localStorage.getItem('jwt');
      axios.get(`/api/usernames/${id}`, {
        headers: {
          'Authorization' : token
        }
      })
      .then((response) => {
        this.setState({ username: response.data });
      });
    }
  }

  setRedirect = () => {
    this.setState({ redirect: true });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
  }

  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  clearLocalStorage = () => {
    localStorage.removeItem('jwt');
  }

  handleClearStorageAndRedirect = () => {
    this.clearLocalStorage();
    this.setRedirect();
  }

  handleClickChangeLanguage = (lang) => () => {
    this.props.setLocale(lang);
  }

  render() {
    return(
      <Navbar color="light" expand="md" light >
        <Container >
          <NavbarBrand href="/">
            <FormattedMessage defaultMessage="Dashboard" id="nav.dashboard" />
          </NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Link to="/follow">Who to follow</Link>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/following">
                  Following
                </Link>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  <FormattedMessage defaultMessage="Login" id="nav.login" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  <FormattedMessage defaultMessage="Signin" id="nav.signin" />
                </NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  <FormattedMessage defaultMessage="Hi" id="nav.hi" />, {this.state.username}
                </DropdownToggle>
                <DropdownMenu id="dropdown" right>
                  <DropdownItem>
                    <FormattedMessage defaultMessage="Settings" id="nav.settings" />
                  </DropdownItem>
                  <DropdownItem divider />
                  {this.renderRedirect()}
                  <DropdownItem onClick={this.handleClearStorageAndRedirect}>
                    <FormattedMessage defaultMessage="Logout" id="nav.logout" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className='сhangeLanguage'>
                <Button onClick={this.handleClickChangeLanguage('en')}>EN</Button>
                <Button onClick={this.handleClickChangeLanguage('ru')}>RU</Button>
              </div>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  setLocale: PropTypes.func.isRequired
};

 const mapStateToProps = (state) => ({
  setLocale: state.locale
});

export const mapDispatchToProps = (dispatch) => ({
  setLocale: lang => dispatch(action.setLocale(lang))
});

export default connect (mapStateToProps, { setLocale })(Header);
