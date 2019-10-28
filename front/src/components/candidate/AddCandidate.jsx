import React from 'react';
import AddSkillInline from '../skill/AddSkillInline';

const Candidate = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit} id="candidateForm">
        <div>
          <div className='addCandidateDiv' >
            <label htmlFor="firstName" className='pull-left'>First Name: </label>
            <input onChange={props.onChange} type="text" maxLength="200" className="form-control inputLogin" id="LastName" placeholder="Name" name='name' />
          </div>
          <div className='addCandidateDiv pull-left'>
            <label htmlFor="lastName" className='pull-left'>Last Name: </label>
            <input onChange={props.onChange} type="text" maxLength="200" className="form-control inputLogin" id="First Name" placeholder="Last Name" name='surname' />
          </div>
        </div>

        <div>
          <div className='addCandidateDiv'>
            <label htmlFor="email" className='pull-left'>E-mail: </label>
            <input onChange={props.onChange} type="text" className="form-control inputLogin" id="Email" placeholder="Email" name='email' />
          </div>

          <div className='addCandidateDiv'>
            <label htmlFor="number" className='pull-left'>Mobile Number: </label>
            <input onChange={props.onChange} type="tel" className="form-control inputLogin" id="phone" placeholder="Mobile Number" name='telNumber' />
          </div>
        </div>

        <div>
          <div className='addCandidateDiv'>
            <label htmlFor="workExperince">Work Experience</label>
            <textarea onChange={props.onChange} className="form-control inputLogin" id="WorkExperience" rows="3" name="expertise"></textarea>
          </div>

        </div>
        <div>
          <div className='addCandidateDiv'>
            <AddSkillInline
              onClick={props.onClick}
              skillList={props.skillList}
              handleDelete={props.handleDelete}
              selectedSkills={props.selectedSkills}
              handleSkillSubmit={props.handleSkillSubmit}
              />
          </div>
        </div>
        <div className='addCandidateDiv'>
          <button type="submit" className="btn btn-orange pull-right" onSubmit={props.onSubmit}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={props.closeModal}>Cancel</button>
        </div>
      </form>

    </div>
  );
};

export default Candidate;