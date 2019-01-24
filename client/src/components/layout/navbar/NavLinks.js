import React, { Component } from 'react';
import styled from 'styled-components';
import {Link,NavLink} from 'react-router-dom';
import {styles} from '../utils';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../../actions/authActions';


class NavLinks extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }



  render() {
    const {isAuthenticated, user} = this.props.auth

    return (
      <LinkWrapper open={this.props.navbarOpen}>
        {isAuthenticated ? (
          <React.Fragment>
            <li><NavLink className="nav-link" to="/dashboard">Home</NavLink></li>            
             <li>
              <a className="nav-link" href="#" onClick={this.onLogoutClick.bind(this)}>
                logout{' '}
              </a>
            </li>
           
          </React.Fragment>

        ) : (
          <React.Fragment>
            <li ><NavLink className="nav-link" to="/registration">Registration</NavLink></li>
            <li ><NavLink className="nav-link" to="/login">Login</NavLink></li>            
          </React.Fragment>

        )}
      </LinkWrapper>
    )
  }
}

const LinkWrapper = styled.ul`
li{
  list-style-type: none;
}
.nav-link{
  display: block;
  text-decoration: none;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: ${styles.colors.mainWhite};
  font-weight: 700;
  text-transform: capitalize;
  cursor: pointer;
  ${styles.transDefault};
  &:hover{
    color: ${styles.colors.mainYellow};
    background: ${styles.colors.mainGrey};
    padding: 0.5rem 1rem 0.5rem 1.3rem;
  }
}
height: ${props => (props.open ? '152px' : '0px')};
overflow: hidden;
${styles.transObject({time:'0.2s'})};
@media(min-width:768px){
  height: auto;
  display: flex;
  margin: 0 auto;
  .nav-link:hover{
    background:none;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
}
`

NavLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(NavLinks);