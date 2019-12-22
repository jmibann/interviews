import React, { useState, useEffect } from 'react';
import SkillInput from '../question/SkillInput';
import SearchInput from './SearchInput';
import './createtemplate.css';

import { fetchCandidateQuestions } from '../../../redux/action-creator/question';

const checkDuplicates = (skilledQuestions, userQuestions) => {
  let incomingQuestions = [...skilledQuestions];
  let userSelectedQuestions = [...userQuestions];
  let output = [];

  output = incomingQuestions.filter(q => !userSelectedQuestions.find(({ id }) => q.id === id));

  return output;
}

const deleteUnselected = (skilledQuestions, userQuestions) => {
  let incomingQuestions = [...skilledQuestions];
  let userSelectedQuestions = [...userQuestions];
  let questionsToRemove = [];
  let output = [];

  questionsToRemove = incomingQuestions.filter(q => userSelectedQuestions.find(({ id }) => q.id === id));
  output = userSelectedQuestions.filter(q => questionsToRemove.find(({ id }) => q.id === id))

  return output
}

const Template = ({ onChange, skillList, selectedSkills, handleSkillSubmit, onSubmit, template, handleQuestion, handleSelectedSkill, redirectGrid }) => {


  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [previousSelectedSkills, setPreviousSelectedSkills] = useState([]);


  useEffect(() => {
    const loadQuestions = async () => await fetchCandidateQuestions(selectedSkills)
      .then(skilledQuestions => {

        let auxArray = [];
        setQuestions(skilledQuestions);

        if (selectedSkills.length > previousSelectedSkills.length) {
          auxArray = checkDuplicates(skilledQuestions, selectedQuestions);
          auxArray = [...selectedQuestions, ...auxArray];
        } else {
          auxArray = deleteUnselected(skilledQuestions, selectedQuestions);
        }

        setPreviousSelectedSkills(selectedSkills);
        setSelectedQuestions(auxArray);
      })

    loadQuestions();
  }, [selectedSkills])


  return (
    <div>
      <div>
        <div className='create-template'>
          <h3>Create new template</h3>
          <label className='pull-left'>Name: </label><span aria-hidden='true' className='red'>*</span>
          <div className='padding'>
            <input onChange={onChange} defaultValue={template.name} type='text' maxLength='200' className='form-control inputLogin' placeholder='Name' name='name' />
          </div>
        </div>

        <div className='create-template'>
          <label className='pull-left'>Skills: </label><span aria-hidden='true' className='red'>*</span>
          <div className='padding'>
            <SkillInput options={skillList} setSkills={handleSkillSubmit} setQuestionSkills={handleSelectedSkill} />
          </div>
        </div>

        <div className='create-template'>
          <SearchInput setQuestions={handleQuestion} onChange={onChange} selectedSkills={selectedSkills} setSelectedQuestions={setSelectedQuestions} selectedQuestions={selectedQuestions} />
        </div>
      </div>

      <div>
        <div>
          <button type='button' className='btn btn-secondary' onClick={redirectGrid}>Cancel</button>
          <button type='button' className='btn btn-orange' onClick={onSubmit}>Create</button>
        </div>
      </div>
    </div>
  )
};

export default Template;