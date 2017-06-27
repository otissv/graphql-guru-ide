import React from 'react';
import { Link } from 'react-router';
import logo from '../images/guru-logo.svg';
import styled from 'styled-components';

const Nav = styled.nav`
  position: absolute;
  height: ${props => props.theme.navbar.height};
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  border-bottom: ${props => props.theme.borders.thinPrimary};
  z-index: 9999;
  padding-left: 15px;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  display: inline;
`;

const Logo = styled.img`
  font-size: 18px;
  color: ${props => props.theme.colors.foreground};
  text-decoration: none;
  display: block;
  float: left;
  height: ${props => props.theme.navbar.height};
  margin: -2px 10px 0 0;

`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.foreground};
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  height: ${props => props.theme.navbar.height};
  padding: 0 15px;
  line-height: ${props => props.theme.navbar.height};

  &:hover {
    background: ${props => props.theme.colors.hoverBackground};
    border-bottom: ${props => props.theme.borders.thickPrimary};
  }

  &:active {
    background: ${props => props.theme.colors.activeBackground};
    border-bottom: ${props => props.theme.borders.thickPrimary};
  }

  &:focus {
    background: ${props => props.theme.colors.focusBackground};
    border-bottom: ${props => props.theme.borders.thickPrimary};
  }

  &:visited {
    background: ${props => props.theme.colors.visitedBackground};
    border-bottom: ${props => props.theme.borders.thickPrimary};
  }
`;

class Navigation extends React.Component {
  render () {
    return (
      <Nav className="uk-navbar App-navigation">
        <NavList className="uk-navbar-nav">
          <NavListItem>
            <Logo src={logo} alt="Guru" />
          </NavListItem>
          <NavListItem>
            <NavLink className="App-navigation-link" to="/">Request</NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink className="App-navigation-link" to="/persisted">
              Persistent
            </NavLink>
          </NavListItem>
        </NavList>
      </Nav>
    );
  }
}

export default Navigation;
