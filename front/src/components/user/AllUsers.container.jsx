import React from 'react';
import { connect } from 'react-redux';
import AllUsersGrid from './AllUsers';
import { getAllUsers } from '../../../redux/action-creator/user';

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    return (
      <div>
        <AllUsersGrid onClick={this.onClick} users={this.props.users} user={this.props.user} usersSIST={this.props.usersSIST} getAllUsers={this.props.getAllUsers} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.user.users,
  usersSIST: state.user.users.filter(user => user.area === 'user')
});
const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);