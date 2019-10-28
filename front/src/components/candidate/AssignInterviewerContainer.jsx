import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getAllUsers } from '../../../redux/action-creator/user'
import { fetchCandidate } from '../../../redux/action-creator/candidate';

class AssignInterviewerContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedUser: true,
      user: null
    }
    this.handleChangeId = this.handleChangeId.bind(this);
    this.submitInterviewer = this.submitInterviewer.bind(this);
  };

  componentDidMount() {

    this.props.getAllUsers();
    this.state.user = null;
    let dropDown = document.getElementById("firstDrop");
    dropDown.selectedIndex = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.candidateID && this.props.candidateID !== nextProps.candidateID)
      this.props.fetchCandidate(nextProps.candidateID);
  }

  handleChangeId(e) {
    e.preventDefault();
    this.setState({ user: Number(e.target.value), selectedUser: false });
  }

  submitInterviewer(candNumber, idCandi) {
    if (candNumber === 1) {
      axios.post('/api/candidate/setUserSIST1', { idUser: this.state.user, idCandi }).then(() => {
        this.props.fetchCandidate(this.props.candidateID);
        $('#assignInterviewerModal').modal('hide');
      })
    } else {
      axios.post('/api/candidate/setUserSIST2', { idUser: this.state.userSIST2, idCandi }).then(() => this.props.fetchCandidate(this.props.candidateID));
    }
  }

  render() {
    return (
      <div className='assignUser'>
        <select id='firstDrop' onChange={this.handleChangeId} className='select-skill' > 
          <option value='' disabled selected>Please select...</option>
          {this.props.users.map(user =>
            <option value={user.id} key={user.id} selected={this.props.interviewer ? user.id === this.props.interviewer : null}>{user.nombre}</option>)}
        </select >
        <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>Cancel</button>
        <button type='submit' className="btn btn-orange" value='Assign system'
          disabled={this.state.selectedUser}
          onClick={() => {
            axios.put('/api/candidate/changeStatus', { idCandi: this.props.candidateID, status: 'Started' }).then(
              () => {
                this.submitInterviewer(1, this.props.candidateID)
                this.props.closeModal();
                this.props.refreshTable();
              })
          }
          }>Assign</button>
      </div>
    )
  }

}
const mapStateToProps = (state) => ({
  users: state.user.users,
  interviewer: state.candidate.candidate.interSIST1Id,
  pepe: state.candidate
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  fetchCandidate: (id) => dispatch(fetchCandidate(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignInterviewerContainer);