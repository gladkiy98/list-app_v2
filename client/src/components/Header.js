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
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { setLocale } from '../actions/changeLocale';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

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

  componentDidMount() {
    let token = localStorage.getItem('jwt');
    axios.get('/api/users', {
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
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/signup">
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
