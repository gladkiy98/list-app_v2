import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { setLocale } from '../actions/changeLocale';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../stylesheets/header.scss';
import SignedIn from './SignedIn';
import NotSignedIn from './NotSignedIn';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      redirect: false,
      signedIn: false
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem('jwt')) {
      this.setState({ signedIn: true });
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
    return (
      <Navbar className='header-navbar' color="light" expand="md" light>
        <Container>
          <NavbarBrand>
            <FormattedMessage defaultMessage="Listup" id="nav.dashboard" />
          </NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!this.state.signedIn &&
                <NotSignedIn />
              }
              {this.state.signedIn &&
                <SignedIn
                    onHandleClearStorage={this.handleClearStorageAndRedirect}
                    renderRedirect={this.renderRedirect} />
              }
              <div className='сhangeLanguage'>
                <button
                    className='button-en'
                    onClick={this.handleClickChangeLanguage('en')}
                    type='button'>
                  EN
                </button>
                <button
                    className='button-ru'
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
