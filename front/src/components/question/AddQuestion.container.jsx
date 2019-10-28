import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { createQuestion, } from '../../../redux/action-creator/question';
import { getAllSkills } from '../../../redux/action-creator/skill';

import SkillInput from './SkillInput';

const AddQuestion = props => {

  const [skills, setSkills] = useState([]);
  const [question, setQuestion] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {

    const fetchSkills = async () => await props.getAllSkills().then(skills => setSkills(skills));

    fetchSkills();
  }, [])


  const { refreshGrid, closeModal, createQuestion } = props;

  const setQuestionContent = e => {
    e.preventDefault();
    setQuestion(e.target.value)
  }

  const setQuestionSkills = (selectedSkills) => { setSelectedSkills(selectedSkills); }

  const onChange = () => { setIsMandatory(!isMandatory) }

  const finalSubmit = () => {
    if (question !== '' && selectedSkills.length > 0) {
      createQuestion(question, selectedSkills, isMandatory)
        .then(() => toastr.success('Question has been created sucessfully'))
        .then(() => setSelectedSkills([])).then(() => refreshGrid()).then(() => closeModal())
    } else if (question === '') {
      toastr.error('Question field empty', 'Question field cannot be empty');
    } else {
      toastr.error('No skill selected', 'All questions must have skills asigned');
    }
  }


  return (
    <div className={'add-question-input-modal'}>
      <div className={'add-question-content'}>
        <label >Question content: </label>
        <textarea type='textbox' name='question' onChange={setQuestionContent} className='question-textbox' />
      </div>

      <div className={'skill-input'}>
        <SkillInput options={skills} setQuestionSkills={setQuestionSkills} />
      </div>

      <div className={'mandatory-input'}>
        <input type='checkbox' value={isMandatory} onChange={onChange} />
        <label className={'mandatory-text'}>Mandatory</label>
      </div>

      <div className={'add-question-footer'}>
        <button type="button" className="btn btn-orange btn-cancel-modal" onClick={closeModal} >Close</button>
        <button className="btn btn-orange pull-right" onClick={finalSubmit} >Create</button>
      </div>
    </div>
  );

};

const mapDispatchToProps = () => ({
  getAllSkills: () => getAllSkills(),
  createQuestion: (content, skills, mandatory) => createQuestion(content, skills, mandatory)
});

export default connect(null, mapDispatchToProps)(AddQuestion);