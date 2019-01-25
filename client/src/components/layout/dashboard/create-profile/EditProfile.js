import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import showcase from '../../img/black-background-bulb-close-up-716398.jpg';
import {withRouter} from 'react-router-dom';
import '../../../auth/log.css';
import PropTypes from 'prop-types'
import Navbar from '../../navbar/Nav'
import {createProfile, getCurrentProfile} from '../../../../actions/profileActions';
import isEmpty from '../../../../validation/is-empty';

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle:'',
    bio:'',
    location:'',

    twitter:'',
    facebook:'',
    linkedin:'',
    youtube:'',
    instagram:'',
    errors:{}
  }
  componentDidMount(){
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
    if(nextProps.profile.profile){
      const profile = nextProps.profile.profile;

      profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter) ?  profile.social.twitter : '';
      profile.facebook = !isEmpty(profile.social.facebook) ?  profile.social.facebook : '';
      profile.instagram = !isEmpty(profile.social.instagram) ?  profile.social.instagram : '';
    
      //set component fields state
      this.setState({
        handle: profile.handle,
        bio: profile.bio,
        location: profile.location,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram        
      })
    }
  }
  onSubmit = e => {
    e.preventDefault();
    
    const profileData = {
      handle: this.state.handle,
      bio: this.state.bio,
      location: this.state.location,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram
    }
    this.props.createProfile(profileData, this.props.history);
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const {errors, displaySocialInputs} = this.state;

    let socialInputs;

    if(displaySocialInputs){
      socialInputs = (
        <div>
          <div>
            <label>twitter</label>{' '}<i className="fab fa-twitter"></i>
            <input type="text" className="text-input" placeholder="twitter"
                onChange={this.onChange}
                value={this.state.twitter}
                name="twitter"
            />
          </div>
          <div>
            <label>facebook</label>{' '}<i className="fab fa-facebook"></i>
            <input type="text" className="text-input" placeholder="facebook"
                onChange={this.onChange}
                value={this.state.facebook}
                name="facebook"
            />
          </div>
          <div>
            <label>instagram</label>{' '}<i className="fab fa-instagram"></i>
            <input type="text" className="text-input" placeholder="instagram"
                onChange={this.onChange}
                value={this.state.instagram}
                name="instagram"
            />
          </div>       
        </div>
      )
    } else {

    }

    return (
      <React.Fragment>
        <Navbar/>
        <div id="wrapper">
          <div id="left">
            <div id="signin">
              <h2 style={{color:'rgba(204,0,0)'}}><span style={{color:'rgba(0,78,204)'}}>Edit</span> your profile</h2>
               
              <form onSubmit={this.onSubmit}>
              <div>
                  <small>{errors.handle && (<small style={{color:'red'}}>{errors.handle}</small>)}</small>
                  <input className="text-input" placeholder="nickname"
                    onChange={this.onChange}
                    value={this.state.handle}
                    name="handle"
                  />
                </div> 

                <div>
                  <textarea className="text-input" placeholder="biografija"
                    onChange={this.onChange}
                    value={this.state.bio}
                    name="bio"
                  />
                </div> 
                <div>
                  <input type="text" className="text-input" placeholder="lokacija"
                    onChange={this.onChange}
                    value={this.state.location}
                    name="location"
                  />
                </div>



                <button className="secondary-btn" style={{marginBottom:'1.5rem'}}
                 onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }))
                }}>drustvene mreze</button><span>{' '}opcije</span>

                {socialInputs}

                <input type="submit" value="submit" className="primary-btn"/> 
              </form>       

            </div>
          </div>

          <div id="right">
            <ShowImg id="showcase" img={showcase}>
                
            </ShowImg>
          </div>
        </div>        
      </React.Fragment>

    )
  }
}


const ShowImg = styled.div`
  background: url(${props => props.img}) no-repeat center center / cover;
`

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));