import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { setLocale } from '../actions/changeLocale';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../stylesheets/header.css';

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

  componentDidMount = (id) => {
    if (localStorage.getItem('jwt')) {
      this.setState({ signedIn: true });
      let token = localStorage.getItem('jwt');
      axios.get(`/api/usernames/${id}`, {
        headers: {
          'Authorization' : token
        }
      })
      .then(response => {
        this.setState({
          username: response.data
        });
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
      <Navbar className='header_navbar' color="light" expand="md" light>
        <Container>
          <NavbarBrand>
            <FormattedMessage defaultMessage="Listup" id="nav.dashboard" />
          </NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!this.state.signedIn &&
              <Nav>
                <NavItem>
                  <Link to="/signup">
                    <button
                        className='header_signup'
                        type='button'>
                      <FormattedMessage defaultMessage="Signup" id="nav.signup" />
                    </button>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/">
                    <button
                        className='header_signin'
                        type='button'>
                      <FormattedMessage defaultMessage="Signin" id="nav.signin" />
                    </button>
                  </Link>
                </NavItem>
              </Nav>
              }
              {this.state.signedIn &&
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  <FormattedMessage defaultMessage="Hi" id="nav.hi" />, {this.state.username}
                </DropdownToggle>
                <DropdownMenu id="dropdown" right>
                  <DropdownItem>
                    <FormattedMessage defaultMessage="Settings" id="nav.settings" />
                  </DropdownItem>
                  <DropdownItem>
                    <Link className='main_link' to="/dashboard" >
                      <FormattedMessage defaultMessage="Main" id="nav.mainpage" />
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  {this.renderRedirect()}
                  <DropdownItem onClick={this.handleClearStorageAndRedirect}>
                    <FormattedMessage defaultMessage="Logout" id="nav.logout" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              }
              <div className='сhangeLanguage'>
                <button
                    className='button_en'
                    onClick={this.handleClickChangeLanguage('en')}
                    type='button'>
                  EN
                </button>
                <button
                    className='button_ru'
                    onClick={this.handleClickChangeLanguage('ru')}
                    type='button'>
                  RU
                </button>
              </div>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {
  setLocale: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    setLocale: state.locale
  };
};

Header.defaultProps = {
  setLocale: () => {}
};

export default connect (mapStateToProps, { setLocale })(Header);
