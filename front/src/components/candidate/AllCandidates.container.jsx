import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import AllCandidatesComp from './AllCandidates';

import { getAllCandidates, fetchMyCandidates } from '../../../redux/action-creator/candidate';
import { getAllUsers } from '../../../redux/action-creator/user';

class AllCandidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    return (<div>
      {
        Object.keys(this.props.user).length
          ? <AllCandidatesComp
            handleCandClick={this.handleCandClick}
            input={this.state.input}
            handleChange={this.handleChange}
            onClick={this.onClick}
            match={this.props.match}
            history={this.props.history}
            users={this.props.users}
            user={this.props.user}
            moreDetails={this.moreDetails} />
          : <Redirect to='/' />
      }
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.user.users,
  candidates: state.candidate.candidates,
  myCandidates: state.candidate.myCandidates
});
const mapDispatchToProps = (dispatch) => ({
  getAllCandidates: () => dispatch(getAllCandidates()),
  getAllUsers: () => dispatch(getAllUsers()),
  fetchMyCandidates: (id) => dispatch(fetchMyCandidates(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCandidates);