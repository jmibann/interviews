import React from 'react';
import SkillInput from '../question/SkillInput';
import UploadFile from '../app/UploadFile';

const Candidate = ({ onChange, skillList, handleSkillSubmit, closeModal, onSubmit, candidate }) => {

  return (
    <div className='add-candidate-modal'>
      <div className='add-candidate-modal-left'>
        <div>
          <div className='addCandidateDiv' >
            <label className='pull-left'>Full Name: </label><span aria-hidden='true' className='red'>*</span>
            <input onChange={onChange} value={candidate.fullName} type='text' maxLength='200' className='form-control inputLogin' placeholder='Full Name' name='fullName' />
          </div>
          <div className='addCandidateDiv pull-left'>
            <label className='pull-left'>Skype ID: </label>
            <input onChange={onChange} value={candidate.skypeId} type='text' maxLength='200' className='form-control inputLogin' id='Skype ID' placeholder='Skype ID' name='skypeId' />
          </div>
        </div>

        <div>
          <div className='addCandidateDiv'>
            <label className='pull-left'>Email: </label><span aria-hidden='true' className='red'>*</span>
            <input onChange={onChange} value={candidate.email} type='text' className='form-control inputLogin' id='Email' placeholder='Email' name='email' />
          </div>

          <div className='addCandidateDiv'>
            <label className='pull-left'>Phone Number: </label>
            <input onChange={onChange} value={candidate.telNumber} type='tel' className='form-control inputLogin' id='phone' placeholder='Phone Number' name='telNumber' />
          </div>
        </div>

        <label className='pull-left'>Skills: </label><span aria-hidden='true' className='red'>*</span>
        <div className='addCandidateDiv' style={{ width: '100%' }}>
          <SkillInput options={skillList} setQuestionSkills={handleSkillSubmit} />
        </div>

        <div className='addCandidateDiv' style={{ width: '100%' }}>
          <label >Work Experience</label>
          <textarea onChange={onChange} className='inputLogin add-candidate-text-input' rows='3' name='expertise'></textarea>
          <span aria-hidden='true' className='red'>*Required field</span>
        </div>

      </div>

      <div className='add-candidate-modal-right'>
        <UploadFile />

        <div className='add-candidate-buttons'>
          <button type='button' className='btn btn-secondary' onClick={closeModal}>Cancel</button>
          <button type='button' className='btn btn-orange pull-right' onClick={onSubmit}>Add</button>
        </div>
      </div>

    </div>
  );
};

export default Candidate;