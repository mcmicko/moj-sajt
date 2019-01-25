import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../img/mcmbook.png';

class NavHeader extends Component {
  render() {
    const {openNav} = this.props
    return (
      <HeaderNav>
        <Link to="/"><img style={{width:'95px'}} src={logo} alt=""/></Link>
        <i onClick={() => {openNav()}} className="fas fa-align-justify toggle-icon"></i>
      </HeaderNav>
    )
  }
}

const HeaderNav = styled.div`
  padding: 0.4rem 1rem;
  position:relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .toggle-icon{
    font-size: 1.75rem;
    color: black;
    cursor: pointer;
  }
  @media(max-width:767px){

  }
  @media(min-width: 768px){
    .toggle-icon{
      display: none;
    }
  }
`

export default NavHeader;