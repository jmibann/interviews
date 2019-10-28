import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import AddUserForm from './AddUser';

import { createUser, getAllUsers } from '../../../redux/action-creator/user';

class addUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      email: '',
      password: '',
      secondPassword: '',
      isAdmin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email.split('@')[1] !== 'endava.com') { toastr.error('Wrong e-mail', 'email must belong to ' + '@endava.com'); }
    else if (this.state.password !== this.state.secondPassword) { toastr.error('Password error', 'Passwords you entered do not match'); }
    else if (this.state.secondPassword.length < 6) { toastr.error('Password too short', 'As minimum your password must contain 6 characters'); }
    else if (!this.state.nombre || !this.state.email || !this.state.password || !this.state.secondPassword) {
      toastr.error('Required fields', 'You must complete all fields in order to continue');
    }
    else {
      for (let i = 0; i < this.props.users.length; i += 1) {
        if (this.props.users[i].email === this.state.email) {
          return toastr.error('User already exist', 'Entered e-mail is already in use');
        }
      }
      this.props.createUSer(this.state);
      this.props.getAllUsers();
      this.props.closeModal();
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      < AddUserForm onChange={this.handleChange} user={this.props.user} users={this.props.users} onSubmit={this.handleSubmit} closeModal={this.props.closeModal} />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.user.users
});
const mapDispatchToProps = (dispatch) => ({
  createUSer: (user) => dispatch((createUser(user))),
  getAllUsers: () => dispatch((getAllUsers()))
});

export default connect(mapStateToProps, mapDispatchToProps)(addUser);