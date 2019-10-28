import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import { checkUserLogin } from '../../../redux/action-creator/user';

import LoginForm from './LoginForm';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      password: '' 
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.checkUserLogin(user).then(() => { this.props.history.push('/'); }).catch(() => toastr.error('Log in error', 'Check your email and password'));
  }

  render() {
    return (
      !Object.keys(this.props.user).length
        ? <LoginForm onChange={this.handleChange} onSubmit={this.handleSubmit} />
        : <Redirect to='/' />
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user.user
});
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: (user) => dispatch((checkUserLogin(user)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);