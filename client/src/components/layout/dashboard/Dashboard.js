import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Navbar from '../navbar/Nav';
import Spinner from '../../common/Spinner';

import {connect} from 'react-redux';
import styled from 'styled-components';
import {getCurrentProfile} from '../../../actions/profileActions';

class Dashboard extends Component {

  componentDidMount(){
    this.props.getCurrentProfile();
  }

  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;

    let dashboardContnent

    if(profile === null || loading){
      dashboardContnent = <Spinner/>
    } else {
      //check is logged in user has profile data
      if(Object.keys(profile).length > 0){
        dashboardContnent = (
          <div>
            <p>welcome<Link to={`/profile/${profile.handle}`}>{user.name}</Link></p> 
            <p>{profile.handle}</p>
            <Link to="/edit-profile">edit profile</Link>        
          </div>
        )
      } else {
        //user is logged in but has no profile
        dashboardContnent = (
          <div>
            <p>you have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="bg-primary btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <React.Fragment>
        <Navbar/>
        <DashWrapper>
          <h1>Dashboard</h1>
          {dashboardContnent}
        </DashWrapper>

      </React.Fragment>
    )
  }
}

const DashWrapper = styled.div`
  margin: 0 20%;
`

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object,
  profile: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})


export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);