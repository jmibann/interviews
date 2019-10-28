import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

import AddCandidateComp from './addcandidate';

import { createCandidate, getAllCandidates } from '../../../redux/action-creator/candidate';
import { fetchAllCandidates } from '../../../redux/action-creator/candidate';


class AddCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillList: [],
      candidateToPost: {
        selectedSkills: [],
        status: 'New'
      }
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSkillSubmit = this.handleSkillSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllCandidates();
    Axios.get('/api/skill/all').then(response => { this.setState({ skillList: response.data }); });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.candidateToPost.name || !this.state.candidateToPost.surname || !this.state.candidateToPost.email || !this.state.candidateToPost.telNumber) {
      toastr.warning('Missing fields...', 'You must complete required fields in order to continue.');
    } else if (this.state.candidateToPost.email.indexOf('@') === -1) {
      toastr.warning('Invalid Email format.', 'Please check your mail address');
    } else if (!this.state.candidateToPost.selectedSkills.length) {
      toastr.warning('Skill field empty', 'Skill field cannot be empty ');
    } else if (this.state.candidateToPost.url && this.state.candidateToPost.url.indexOf(' ') !== -1) {
      toastr.warning(' LinkedIn URL', 'LinkedIn field cannot contain blank spaces');
    } else if (this.state.candidateToPost.email.indexOf(' ') !== -1) {
      toastr.warning('Wrong e-mail address', 'e-mail address cannot contain blank spaces');
    } else {
      let i = 0;
      for (i = 0; i < this.props.candidates.length; i += 1) {
        if (this.props.candidates[i].email === this.state.candidateToPost.email) {
          toastr.error('e-mail already exist');
          break;
        }
      }
      if (i === this.props.candidates.length) {
        this.props.createCandidate(this.state.candidateToPost).then(() => {
          this.props.refreshTable();
          this.props.closeModal();

        })
      }
    }
  }

  handleChange(e) {
    let candidateToPost = { ...this.state.candidateToPost, [e.target.name]: e.target.value };
    this.setState({ candidateToPost });
  }

  handleSkillSubmit(e) {
    e.preventDefault();
    let skillID = e.target.value;
    let selectedSkills = this.state.candidateToPost.selectedSkills;
    let exist = false;

    selectedSkills.forEach(skill => {
      if (skill.id === Number(skillID)) {
        toastr.warning('Skill already selected');
        exist = true;
      }
    });

    if (exist) return;
    selectedSkills.push(this.state.skillList.find(skill => skill.id == skillID));
    let candidateToPost = { ...this.state.candidateToPost, selectedSkills };
    this.setState({ candidateToPost });
  }
  onClick() {
    this.props.history.push('/candidate');
  }

  handleDelete(e) {
    let toDelete = e.target.getAttribute('value');
    let arr = this.state.candidateToPost.selectedSkills;
    arr.splice(toDelete, 1);
    let candidateToPost = { ...this.state.candidateToPost, arr };
    this.setState({ candidateToPost });
  };


  render() {
    return (
      <AddCandidateComp
        onClick={this.onClick}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        skillList={this.state.skillList}
        handleDelete={this.handleDelete}
        closeModal={this.props.closeModal}
        handleSkillSubmit={this.handleSkillSubmit}
        refreshTable={this.props.refreshTable}
        fetchAllCandidates={this.props.fetchAllCandidates}
        selectedSkills={this.state.candidateToPost.selectedSkills}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  candidate: state.candidate.candidate,
  candidates: state.candidate.candidates
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  createCandidate: (candidate) => dispatch(createCandidate(candidate)),
  getAllCandidates: () => dispatch(getAllCandidates()),
  fetchAllCandidates: () => dispatch(fetchAllCandidates())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCandidate);
