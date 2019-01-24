import React, { Component } from 'react'
import Navbar from '../layout/navbar/Nav';
import {connect} from 'react-redux';

class Dashboard extends Component {
  render() {
    const {user} = this.props.auth
    return (
      <div>
        <Navbar/>
        <h1>Dashboard</h1>
        <img src={user.avatar} alt=""/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);