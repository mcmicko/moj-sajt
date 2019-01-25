import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';
import Navbar from '../layout/navbar/Nav';
import './log.css';
import styled from 'styled-components';
import showcase from '../layout/img/action-astronomy-constellation-1274260.jpg';



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
                      <input id="text-input" 
                      onChange={this.onChange} placeholder="email" 
                      name="email" 
                      value={this.state.email} type="email"/>
                    </div>

                    <div>
                    <small>{errors.password && (<small style={{color:'red'}}>{errors.password}</small>)}</small>
                      <input id="text-input" 
                      onChange={this.onChange} 
                      placeholder="password" name="password" 
                      value={this.state.password} 
                      type="password" />
                    </div>
                    <input className="primary-btn" type="submit" value="submit"/>            
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