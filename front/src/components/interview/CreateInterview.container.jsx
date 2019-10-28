import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchCandidate } from '../../../redux/action-creator/candidate';
import { searchHRQuestions } from '../../../redux/action-creator/question';
import { submitHRAnswers, fetchHrAnswers } from '../../../redux/action-creator/answer';

import CreateInterviewComp from './CreateInterviewComp';
import ReportComp from '../report/ReportComp';
import Axios from 'axios';

class CreateInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interviewID: this.props.idInter,
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.searchHRQuestions();
    this.props.fetchCandidate(this.props.idCand);
    this.props.fetchHrAnswers(this.props.idInter);
  }

  handleChange(e) {
    this.setState(
      { [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let a = this.state;
    this.props.submitHRAnswers(a)
      .then(Axios.put('/api/candidate/changeStatus', { idCandi: this.props.idCand, status: 'Pending HR' })).then(() => { this.setState({ submitted: true }) });
  }

  render() {
    return (<div>
      {
        Object.keys(this.props.user).length
          ? (!this.state.submitted && !this.props.answersHR.length && this.props.candidate.status === 'New')
            ? <CreateInterviewComp
              onSubmit={this.onSubmit}
              onChange={this.handleChange}
              questions={this.props.questionsHR}
              candidate={this.props.candidate}
              idInter={this.props.idInter}
            />
            : <ReportComp
              questions={this.props.questionsHR}
              idCand={this.props.idCand}
              candidate={this.props.candidate}
              idInter={this.props.idInter}
              history={this.props.history}
            />
          : <Redirect to='/' />
      }
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  candidate: state.candidate.candidate,
  questionsHR: state.question.questionsHR,
  answersHR: state.answers.answersHR
});

const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (idCandi) => dispatch(fetchCandidate(idCandi)),
  searchHRQuestions: () => dispatch(searchHRQuestions()),
  submitHRAnswers: (state) => dispatch(submitHRAnswers(state)),
  fetchHrAnswers: (interviewID) => dispatch(fetchHrAnswers(interviewID))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateInterview);