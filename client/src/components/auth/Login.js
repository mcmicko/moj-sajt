import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';

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
      <div className="container">
        <h1>Login</h1>
        <div className="col s12">
          <form onSubmit={this.onSubmit}>
            <div className="input-field col s6">
              <input onChange={this.onChange} placeholder="email" name="email" value={this.state.name} type="email" class={classnames('', {'invalid' : errors.email})}/>
              {errors.email && (<small className="red-text">{errors.email}</small>)}
            </div>

            <div className="input-field col s6">
              <input onChange={this.onChange} placeholder="password" name="password" value={this.state.password} type="password" class={classnames('', {'invalid' : errors.password})}/>
              {errors.password && (<small className="red-text">{errors.password}</small>)}
            </div>
            <input className="btn #4527a0 deep-purple darken-3" type="submit" value="submit"/>            
          </form>

        </div>
      </div>
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