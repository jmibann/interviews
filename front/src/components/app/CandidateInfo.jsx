import React, { useState, useEffect } from 'react';
import { fetchCandidate } from '../../../redux/action-creator/candidate.js';
import { connect } from 'react-redux';
import Button from './Button';


const CandidateInfo = props => {

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => await props.fetchCandidate(props.candID).then(res => setCandidate(res));

    fetchCandidate();
  }, []);

  const onClick = () => { props.history.push('/') };

  return (
    candidate
      ? <div>
        <div className='sub-title'>Candidate: {candidate.fullName} - {candidate.skills && <span>{candidate.skills.map(skill => skill.skill).join(" - ")}</span>}</div>
        <div className='form-group inline-block'>
          <div className="col-md-4 no-padding">
            <p>Email Address: {candidate.email}</p>
          </div>
          <div className="col-md-4 no-padding">
            <p>Phone: {candidate.telNumber}</p>
          </div>
          <div className="col-md-4 no-padding">
            <p>SkypeID: <span>SKYPE ID PLACEHOLDER</span></p>
          </div>
          <div className="col-md-12 no-padding pull-down">
            <p>Candidate's Expertise:
              <textarea readOnly className='form-control' name='expertise' rows='10' cols='50' id='candidateExpTextarea'>{candidate.expertise}</textarea></p>
          </div>
        </div>
        <div className='form-group inline-block'>
          <button className='btn btn-orange pull-down pull-left' type='Submit'> Add Interviewer</button>
          <button className='btn btn-orange pull-down' type='Submit'> Start Interview</button>
          <button className='btn btn-orange pull-down' type='Submit'> See Report</button>
          <button className='btn btn-orange pull-down pull-right no-margin' onClick={onClick} type='Submit'> <i className="far fa-window-close"></i>Back</button>
        </div>
      </div>

      : null
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchCandidate: (id) => dispatch(fetchCandidate(id))
});

export default connect(null, mapDispatchToProps)(CandidateInfo);