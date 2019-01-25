import React, { Component } from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import classnames from 'classnames';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import Navbar from '../layout/navbar/Nav';
import './log.css';
import showcase from '../layout/img/art-backlit-blue-732223.jpg';


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
        <div id="wrapper">

          <div id="left">
            <div id="signin">
              <h1>Register</h1>
              <form onSubmit={this.onSubmit}>
                <div className="input-field col s6">
                  <small>{errors.name && (<small style={{color:'red'}}>{errors.name}</small>)} </small>               
                  <input id="text-input" onChange={this.onChange} value={this.state.name} placeholder="name" name="name" type="text" className={classnames('', {'invalid' : errors.name})}/>
                </div>

                <div className="input-field col s6">
                <small>{errors.name && (<small style={{color:'red'}}>{errors.email}</small>)}</small>
                <input id="text-input" onChange={this.onChange} value={this.state.email} placeholder="email" name="email" type="text" className={classnames('', {'invalid' : errors.email})}/>
                </div>

                <div className="input-field col s6">
                <small>{errors.name && (<small style={{color:'red'}}>{errors.password}</small>)}</small>
                <input id="text-input" onChange={this.onChange} value={this.state.password} placeholder="password" name="password" type="password" className={classnames('', {'invalid' : errors.password})}/>
                </div>

                <div className="input-field col s6">
                <small>{errors.name && (<small style={{color:'red'}}>{errors.password2}</small>)}</small>
                <input id="text-input" onChange={this.onChange} value={this.state.password2} placeholder="confirm password" name="password2" type="password" className={classnames('', {'invalid' : errors.password2})}/>
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Regist));