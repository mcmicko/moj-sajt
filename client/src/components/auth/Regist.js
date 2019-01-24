import React, { Component } from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import Navbar from '../layout/navbar/Nav';

class Regist extends Component {
  state = {
    name: '',
    email:'',
    password:'',
    password2:'',
    errors: {}
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    const {errors} = this.state;
    return (
      <React.Fragment>
        <Navbar/>
        <div className="container">
          <h1>Register</h1>
          <div className="col s12">

            <form onSubmit={this.onSubmit}>
              <div className="input-field col s6">
                <input onChange={this.onChange} value={this.state.name} placeholder="name" name="name" type="text" className={classnames('', {'invalid' : errors.name})}/>
                {errors.name && (<small className="red-text">{errors.name}</small>)}
              </div>

              <div className="input-field col s6">
              <input onChange={this.onChange} value={this.state.email} placeholder="email" name="email" type="text" className={classnames('', {'invalid' : errors.email})}/>
              {errors.name && (<small className="red-text">{errors.email}</small>)}
              </div>

              <div className="input-field col s6">
              <input onChange={this.onChange} value={this.state.password} placeholder="password" name="password" type="password" className={classnames('', {'invalid' : errors.password})}/>
              {errors.name && (<small className="red-text">{errors.password}</small>)}
              </div>

              <div className="input-field col s6">
              <input onChange={this.onChange} value={this.state.password2} placeholder="confirm password" name="password2" type="password" className={classnames('', {'invalid' : errors.password2})}/>
              {errors.name && (<small className="red-text">{errors.password2}</small>)}
              </div>

              <input className="btn #4527a0 deep-purple darken-3" type="submit" value="submit"/>        
            </form>

          </div>
        </div>
      </React.Fragment>

    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Regist));