import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';
import Navbar from '../layout/navbar/Nav';
import './log.css';


class Login extends Component {
  state = {
    email:'',
    password:'',
    errors: {}
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData);
  }

  render() {
    const {errors} = this.state
    return (
      <React.Fragment>
        <Navbar style={{position:'fixed'}}/>
            <div id="wrapper">
              <div id="left">
                <div id="signin">

                  <h1 style={{color:'red'}}>Login</h1>
                  <form onSubmit={this.onSubmit}>
                    <div className="input-form">
                    <small>{errors.email && (<small style={{color:'red'}}>{errors.email}</small>)}</small>
                      <input id="text-input" onChange={this.onChange} placeholder="email" name="email" value={this.state.name} type="email" class={classnames('', {'invalid' : errors.email})}/>
                    </div>

                    <div>
                    <small>{errors.password && (<small style={{color:'red'}}>{errors.password}</small>)}</small>
                      <input id="text-input" onChange={this.onChange} placeholder="password" name="password" value={this.state.password} type="password" class={classnames('', {'invalid' : errors.password})}/>
                      
                    </div>
                    <input className="primary-btn" type="submit" value="submit"/>            
                  </form>
                </div>

              </div>
              <div id="right">
                <div id="showcase">
                  <div class="showcase-content">
                     <h1 class="showcase-text">
                      Let's create the ffuture <strong>together</strong>
                     </h1>
                    <a href="#" class="secondary-btn">Start a FREE 10-day trial</a>
                  </div>
                </div>
              </div>
            </div>
      </React.Fragment>

    )
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login)