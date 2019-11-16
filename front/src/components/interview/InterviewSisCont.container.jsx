import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { fetchCandidate } from '../../../redux/action-creator/candidate';
import { fetchSisQuestions } from '../../../redux/action-creator/question';
import { answerSystems } from '../../../redux/action-creator/answer';
import InterviewSisComp from './InterviewSisComp';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

class InterviewSisCont extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      idAnswersScore: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidate(this.props.idCand).then(candidate => {
      this.props.fetchSisQuestions(candidate.InterviewIDId);
      this.setState({ InterviewSis: candidate.InterviewIDId });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.questionSIS.length === this.state.idAnswersScore.length) {
      let state2 = this.state
      delete state2.idAnswersScore;
      this.props.answerSystems(state2);
      this.onClick();
    } else {
      toastr.warning('Missing fields...', 'You must complete all scores in order to continue.');
    }
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.name == 'score') {
      this.state.idAnswersScore.push({ id: e.target.id, name: e.target.name, value: e.target.value, isScore: true })
      this.setState({ [e.target.id + '-' + e.target.name]: e.target.value });
    } else {
      this.setState({ [e.target.id + '-' + e.target.name]: e.target.value });
    }
  }
  onClick() {
    Axios.put('/api/candidate/changeStatus', { idCandi: this.props.candidate.id, status: 'Started' })
      .then(() => this.props.history.push(`/candidate/${this.props.idCand}/interview/${this.props.candidate.InterviewIDId}`));
  }

  render() {
    return (
      <div>
        {
          Object.keys(this.props.user).length
            ? <InterviewSisComp
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              questions={this.props.questionSIS}
              candidate={this.props.candidate}
              onClick={this.onClick}
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
  questionSIS: state.question.questionSIS
});

const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (idCandi) => dispatch(fetchCandidate(idCandi)),
  fetchSisQuestions: (idInter) => dispatch(fetchSisQuestions(idInter)),
  answerSystems: (answer) => dispatch(answerSystems(answer))
});

export default connect(mapStateToProps, mapDispatchToProps)(InterviewSisCont);