import React from 'react';

import { Link } from 'react-router-dom';

const CreateInterviewComp = (props) => {
  return (
    <div>

      <div id='infoCandHR' className='masGrid' style={{ marginLeft: '30px' }}>
        <div className='labels'>
          <h3>Full name: {props.candidate.fullName} </h3>
          <h3>Candidate ID: {props.candidate.id}</h3>
          <h3>Email Adress: {props.candidate.email}</h3>
          <h3>Phone: {props.candidate.telNumber} </h3>
          <h3>Skills :  {props.candidate.skills.map(skill => { skill.skill + ' - ' })}</h3>
        </div>
        <div>
          <div style={{ marginTop: '30px' }}>
            <h4><strong style={{ borderBottom: '1px solid black' }}> Experience</strong></h4>
            <h4>{props.candidate.expertise}</h4>
          </div>
        </div>
      </div>
      <div style={{ width: '90%', margin: '20px auto', marginTop: '50px', borderBottom: '2px solid #DE411B' }}></div>
      <form id='formCand'>
        {props.questions.map((pregunta) => {
          return (
            <div key={pregunta.id} className="form-row">
              <div className="form-group" style={{ marginLeft: '20px' }}>
                <label htmlFor="inputEmail4" style={{ margin: '10px' }}>
                  <strong className='questionHR' style={{ borderBottom: '1px solid black' }}>{pregunta.content}</strong>
                </label>
                <textarea onChange={props.onChange} name={pregunta.id} id='HRtextarea' type="email" className="form-control" placeholder="Respuesta" />
              </div>
            </div>
          );
        })}
        <button type='button' className='btn btn-orange pull-right' onClick={props.onSubmit}>Submit</button>
      </form>
    </div>
  );
};
export default CreateInterviewComp;