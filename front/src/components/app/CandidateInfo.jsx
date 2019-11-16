import React, { useState, useEffect } from 'react';
import { fetchCandidate } from '../../../redux/action-creator/candidate.js';


const CandidateInfo = props => {

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const loadCandidate = async () => await fetchCandidate(props.candID).then(candidate => setCandidate(candidate));

    loadCandidate();
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
              <textarea readOnly className='form-control' name='expertise' rows='10' cols='50' id='candidateExpTextarea' value={candidate.expertise}></textarea></p>
          </div>
        </div>
        <div className='form-group inline-block'>
          <button className='btn btn-orange pull-down pull-left' type='Submit'> Add Interviewer</button>
          <button className='btn btn-orange pull-down' type='Submit'> Start Interview</button>
          <button className='btn btn-orange pull-down' type='Submit'> See Report</button>
          <button className='btn btn-orange pull-down pull-right no-margin' onClick={onClick} type='Submit'> <span style={{ width: '75px', display: 'flex', justifyContent: 'space-evenly' }}>
            <i className="far fa-window-close"></i>Back</span></button>

        </div>
      </div >

      : null
  );
}


export default CandidateInfo;