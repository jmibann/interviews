import React, { useState } from 'react';
import Checkbox from './Checkbox';

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
    <div className='questions'>
      <form>
        <input type="checkbox" onClick={handleAllChecked} checked={isAllSelected} value="checkedAll" /> Select all/Unselect all
        <ul>
          {
            questions.map(({ content, id, isChecked }) => (<Checkbox key={id + content} id={id} content={content} isChecked={isChecked} handleCheckChildElement={handleCheckChildElement} />))
          }
        </ul>
        <div className="divider"></div>

        <button className='btn btn-orange pull-right no-margin' onClick={onSubmit} type='Submit' disabled={isDisabledToSubmit}>Create Interview <i className="fas fa-play-circle"></i></button>
        <button className='btn btn-orange pull-left no-margin' onClick={props.cancel} type='Submit'> <i className="far fa-window-close"></i>Cancel</button>
      </form>
    </div >
  );
}

export default Checkboxes;


