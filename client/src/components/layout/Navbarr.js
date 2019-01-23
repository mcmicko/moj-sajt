import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
// import {Navbar, NavItem} from 'react-materialize';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import Navbar from 'react-materialize/lib/Navbar';

class Navbarr extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }
  render(){
    const {isAuthenticated, user} = this.props.auth

    const authLinks = (
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><a href="#" onClick={this.onLogoutClick.bind(this)}>
                logout{' '} <img className="rounded-circle" style={{width:'25px', marginRight:'5px'}} src={user.avatar} alt={user.name} title="gravatar"/>
              </a>
          </li>
        </ul>      
    );
    const guestLink = (
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><NavLink to="/registration">Registration</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>   
    )
  return (
    <nav className="#4527a0 deep-purple darken-3">
      <div className="nav-wrapper">
        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        
        
        <Link to="/" className="brand-logo right">Logo</Link>
        
        {isAuthenticated ? authLinks : guestLink}

      </div>
    </nav>
  )
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbarr);