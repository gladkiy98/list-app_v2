import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
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
  Container
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: undefined,
      redirect: false,
    };
  }

  componentWillMount() {
    const jwt = window.localStorage.getItem('jwt');
    const result = jwtDecode(jwt);
    this.setState({ username: result.username });
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

  render() {
    return(
      <Navbar color="light" expand="md" light >
        <Container>
          <NavbarBrand href="/">List App</NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Signin</NavLink>
              </NavItem>
              <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav>
                  Hi, {this.state.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  {this.renderRedirect()}
                  <DropdownItem onClick={this.handleClearStorageAndRedirect}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
