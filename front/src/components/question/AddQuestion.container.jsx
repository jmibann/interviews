import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';

import AddQuestion from './AddQuestion';
import { getAllSkills } from '../../../redux/action-creator/skill';
import { createQuestion, } from '../../../redux/action-creator/question';

const AddQuestionContainer = ({ refreshGrid, closeModal }) => {

  const [skills, setSkills] = useState([]);
  const [question, setQuestion] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {

    const fetchSkills = async () => await getAllSkills().then(skills => setSkills(skills));

    fetchSkills();
  }, [])

  const setQuestionContent = (e) => {
    e.preventDefault();
    setQuestion(e.target.value)
  }

  const setQuestionSkills = (selectedSkills) => { setSelectedSkills(selectedSkills) };

  const onChange = () => { setIsMandatory(!isMandatory) };

  const checkIfSkillWasSelected = () => { return (question !== '' && selectedSkills.length > 0) };

  const checkEmptyQuestion = () => { return question === '' }

  const finalSubmit = () => {
    if (checkIfSkillWasSelected()) {
      createQuestion(question, selectedSkills, isMandatory)
        .then(wasCreated => {
          if (wasCreated) {
            toastr.success('Question has been created sucessfully');
            setSelectedSkills([]);
            refreshGrid();
            closeModal();
          } else {
            toastr.error('Question already exists', 'Question cannot be duplicated');
          }
        })
    } else if (checkEmptyQuestion()) {
      toastr.error('Question field empty', 'Question field cannot be empty');
    } else {
      toastr.error('No skill selected', 'All questions must have skills asigned');
    }
  }


  return (
    <AddQuestion
      skills={skills}
      onChange={onChange}
      closeModal={closeModal}
      finalSubmit={finalSubmit}
      isMandatory={isMandatory}
      setQuestionSkills={setQuestionSkills}
      setQuestionContent={setQuestionContent}
    />
  );

};

export default AddQuestionContainer;