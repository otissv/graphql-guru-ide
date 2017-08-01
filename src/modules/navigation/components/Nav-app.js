import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import { Link } from 'react-router';
import logo from '../../../images/guru-logo.svg';
import styled from 'styled-components';
import {
  SCHEMA_AST_ROUTE,
  SCHEMA_DEFINITION_ROUTE
} from '../../schema/route-schema';

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
  border-bottom: ${props => props.active ? props.theme.borders.thinPrimary : 'none'};
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

const LinkWrapper = props => 
  <Link
    children={props.children}
    className={props.className}
    to={props.to}
    data-nav={props.nav}
    onClick={props.onClick}
  />;

const NavLink = styled(LinkWrapper)`
  color: ${props => props.active 
    ? props.theme.colors.primary
    : props.theme.colors.foreground};
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
  height: ${props => props.theme.navbar.height};
  padding: 0 15px;
  line-height: ${props => props.theme.navbar.height};
  border-bottom: props.theme.borders.thickPrimary;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:active {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    color: ${props => props.theme.colors.primary};
  }
`;

class Navigation extends PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);
    this.state = {
      active: 'request'
    };
  }

  handleNavListItemClick (event) {
    this.setState({ active : event.currentTarget.dataset.nav });
  }

  render () {
    return (
      <Nav className="uk-navbar App-navigation">
        <NavList className="uk-navbar-nav">
          <NavListItem 
            nav="request" 
            onClick={this.handleNavListItemClick}
          >
            <Logo src={logo} alt="Guru" />
          </NavListItem>
          <NavListItem>
            <NavLink 
              className="App-navigation-link"
              to="/"
              nav="request" 
              onClick={this.handleNavListItemClick}
              active={this.state.active === 'request' || false}
            >
              Request
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink 
              className="App-navigation-link"
              to="/persisted"
              nav="persisted" 
              onClick={this.handleNavListItemClick}
              active={this.state.active === 'persisted' || false}
            >
              Persisted
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink 
              className="App-navigation-link"
              to={SCHEMA_AST_ROUTE}
              nav="ast" 
              onClick={this.handleNavListItemClick}
              active={this.state.active === 'ast' || false}
            >
              AST
            </NavLink>
          </NavListItem>
          <NavListItem>
            <NavLink
              className="App-navigation-link"
              to={SCHEMA_DEFINITION_ROUTE}
              nav="definition" 
              onClick={this.handleNavListItemClick}
              active={this.state.active === 'definition' || false}
            >
              Definitions
            </NavLink>
          </NavListItem>
        </NavList>
      </Nav>
    );
  }
}

export default Navigation;
