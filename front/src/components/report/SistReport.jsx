import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { fetchSistAnswers } from '../../../redux/action-creator/answer';
import { fetchCandidate } from '../../../redux/action-creator/candidate';
import CandidateInfo from '../app/CandidateInfo';
import StarsCalification from './StarsCalification';

class ReportComp extends React.Component {
  constructor() {
    super();
    this.changeCandStatus = this.changeCandStatus.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidate(this.props.idCand)
      .then(() => this.props.fetchSistAnswers(this.props.candidate.InterviewIDId));
  }

  changeCandStatus(idCandi, status) {
    Axios.put('/api/candidate/changeStatus', { idCandi, status })
      // .then(() => this.props.getAllCandidates())
      .then(() => this.props.history.push('/candidate'));
  };

  render() {
    var SistInterv1 = !this.props.candidate.interSIST1 ? '' : this.props.candidate.interSIST1.nombre;
    var SistInterv2 = !this.props.candidate.interSIST2 ? '' : this.props.candidate.interSIST2.nombre;

    return (
      <div >
        <div id='infoCandHR'>
          <div>
            <CandidateInfo candidate={this.props.candidate} />
            <div >
              <h2 className={'borde ' + this.props.candidate.status}>
                <p>STATUS: <span className={'statusReport ' + this.props.candidate.status}>{' ' + this.props.candidate.status} </span></p>
              </h2>
              {(this.props.candidate.interSIST1 || this.props.candidate.interSIST2) &&
                <h2>Interviewer: <h2>{' ' + SistInterv1} {SistInterv2 ? ', ' + SistInterv2 : ''}</h2></h2>}
            </div>
            {(this.props.candidate.status == 'Approved' || this.props.candidate.status == 'Rejected'
              ? null
              : <div className='divito'>
                <div className='mitadReport'>
                  <button className='btn btn-green' id='appReport' onClick={() => this.changeCandStatus(this.props.candidate.id, 'Approved')}>APPROVE</button>
                  <button className='btn btn-red' id='rejReport' onClick={() => this.changeCandStatus(this.props.candidate.id, 'Rejected')}>REJECT</button>
                </div>
              </div>
            )}
          </div>

          <div className='answersHR'>
            {
              this.props.answersSIST.map(element => (

                < div key={element.question} className='answerBox' >
                  <h5>
                    {element.question} :
                    <p>{element.observation}</p>
                  </h5>
                  <StarsCalification score={element.score} />
                </div>
              ))
            }
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  candidate: state.candidate.candidate,
  answersSIST: state.answers.answersSIST
});

const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (idCandi) => dispatch(fetchCandidate(idCandi)),
  fetchSistAnswers: (interviewID) => dispatch(fetchSistAnswers(interviewID)),
  getAllCandidates: () => dispatch(getAllCandidates())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportComp);