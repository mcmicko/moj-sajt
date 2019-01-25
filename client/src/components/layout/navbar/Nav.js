import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


import NavHeader from './NavHeader';
import NavLinks from './NavLinks';
import NavIcons from './NavIcons';

class Nav extends Component {
  state = {
    navbarOpen: false
  }

  openNav = () => {
    this.setState({navbarOpen: !this.state.navbarOpen});
  }
  
  render() {
    return (
      <NavStyle>
        <NavHeader openNav={this.openNav}/>
        <NavLinks navbarOpen={this.state.navbarOpen}/>
        <NavIcons/>
      </NavStyle>
    )
  }
}

const NavStyle = styled.nav`
  background: linear-gradient(to right, rgba(204,0,0,0.7) 0%,rgba(0,78,204,0.7) 82%);
  box-shadow: 0px 2px 15px 1px #000;
  @media (min-width:768px){
    display: flex;
    align-items: center;
    // justify-content: center;
  }

`

export default Nav;