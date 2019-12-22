import React, { useState } from 'react';
import Checkbox from './Checkbox';
import './checkboxes.css';

const Checkboxes = props => {

  const [questions, setQuestions] = useState(props.questions.map(question => ({ ...question, isChecked: false })));
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isDisabledToSubmit, setIsDisabledToSubmit] = useState(true);

  const handleAllChecked = (event) => {
    let checkedQuestions = questions;
    checkedQuestions = questions.map(({ id, content, isChecked }) => ({ id, content, isChecked: !isAllSelected }));
    setIsAllSelected(!isAllSelected);
    setIsDisabledToSubmit(isAllSelected);
    setQuestions(checkedQuestions);
  }

  const handleCheckChildElement = (event) => {
    let checkedQuestions;
    let isDisabledToSubmit = true;

    checkedQuestions = questions.map(({ id, content, isChecked }) => ({ id: id, content: content, isChecked: (id == event.target.value) ? !isChecked : isChecked }));
    checkedQuestions.forEach(({ isChecked }) => { if (isChecked) isDisabledToSubmit = false; })
    setIsAllSelected(false);
    setIsDisabledToSubmit(isDisabledToSubmit);
    setQuestions(checkedQuestions);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    props.checkChange().then(() => props.redirection());
  }

  return (
    <div className='questions-box'>
      <div className='all-selector-checkbox'>
        <input type="checkbox" onClick={handleAllChecked} checked={isAllSelected} value="checkedAll" /> Select all/Unselect all
      </div>
      <div>
        <ul>
          {
            questions.map(({ content, id, isChecked }) => (<Checkbox key={id + content} id={id} content={content} isChecked={isChecked} handleCheckChildElement={handleCheckChildElement} />))
          }
        </ul>

        <button className='btn btn-orange pull-right no-margin'
          // onClick={onSubmit} TODO:here we should implement a Modal where you will be able to see the questions you selected from the template
          type='Submit' disabled={isDisabledToSubmit}> See Preview </button>
      </div>
    </div>
  );
}

export default Checkboxes;


