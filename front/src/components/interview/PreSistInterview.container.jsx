import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setInterviewCandidate } from '../../../redux/action-creator/interview';
import { fetchCandidate } from '../../../redux/action-creator/candidate';
import { fetchCandidateQuestions } from '../../../redux/action-creator/question';

import CandidateInfo from '../app/CandidateInfo';
import Checkboxes from '../app/CheckBoxes';

class PreSistInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsString: null,
    };
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onClickFunc = this.onClickFunc.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  };

  componentDidMount() {
    this.props.fetchCandidate(this.props.candID)
      .then(() => axios.post('/api/interview/newInterview', { candidateId: this.props.candidate.id }))
      .then(() => {
        this.props.fetchCandidateQuestions(this.props.candidate.skills);
        this.setState({ candidato: this.props.candidate });
      }
      )
  }

  componentWillUpdate(prevState) {
    if (this.props.candidate.id && !this.state.skillsString) {
      this.state.skillsString = this.props.candidate.skills.map(skillObj => skillObj.skill).join(' - ')
    }
  }

  onChangeCheckbox() {
    let arrayQuestionsID = [];
    let checks = $(' input[type="checkbox"]');

    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked && checks[i].value !== 'checkedAll')
        arrayQuestionsID.push(Number(checks[i].value));
    }
    return this.props.setInterviewCandidate({ candidateID: this.props.candidate.id, questionsID: arrayQuestionsID });
  }

  onClickFunc() {
    this.props.history.push(`/candidate/interview/${this.props.candidate.id}`);
  }
  onClickCancel() {
    this.props.history.push('/');
  }
  render() {
    return (
      Object.keys(this.props.user).length
        ? <div>
          <CandidateInfo candID={this.props.candID} />
          <div className='sub-title'>Select questions</div>
          <div className='legend'>Select one or more questions to proceed</div>
          {this.props.candidateQuestions.length
            ? <Checkboxes questions={this.props.candidateQuestions} candidate={this.props.candidate} redirection={this.onClickFunc} cancel={this.onClickCancel} checkChange={this.onChangeCheckbox} />
            : null
          }
        </div >
        : <Redirect to='/' />
    );
  }
}
const mapStateToProps = (state) => ({
  candidate: state.candidate.candidate,
  candidateQuestions: state.question.candidateQuestions
});
const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (candID) => dispatch(fetchCandidate(candID)),
  fetchCandidateQuestions: (skills) => dispatch(fetchCandidateQuestions(skills)),
  setInterviewCandidate: (obj) => dispatch(setInterviewCandidate(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreSistInterview);