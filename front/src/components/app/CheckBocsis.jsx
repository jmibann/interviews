import React, { useState } from 'react';
import Checkbox from './Checkbox';

const Checkboxes = props => {

  const [questions, setQuestions] = useState(props.questions);
  const [enableSave, setEnableSave] = useState(false);

  const handleAllChecked = (event) => {
    let questionsAux = questions;
    questionsAux.forEach(question => question.isChecked = event.target.checked);
    setQuestions(questionsAux);
    setEnableSave(event.target.checked ? true : false);
  }

  const handleCheckChildElement = (event) => {
    let questionsAux = questions;
    questionsAux.forEach(question => {
      if (question.id == event.target.value) question.isChecked = event.target.checked;
    });
    setQuestions(questionsAux);
    setEnableSave(event.target.checked ? true : false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.checkChange().then(() => props.redirection());
  }

  return (
    <div className='questions'>
      {console.log("33333333333333333333333333 QUESTIONS LOCALES: ", questions)}
      <form>
        <input type="checkbox" onClick={handleAllChecked} value="checkedAll" /> Select all/Unselect all
        <ul>
          {questions.map(({ content, id, isChecked }) => <Checkbox key={id} handleCheckChildElement={handleCheckChildElement}
            content={content} id={id} isChecked={isChecked} />)}
          {/* <Checkbox questions={questions} handleCheckChildElement={handleCheckChildElement} /> */}
        </ul>
        <div className="divider"></div>

        <button className='btn btn-orange pull-right no-margin' onClick={e => onSubmit(e)} type='Submit' disabled={!enableSave}>Create Interview <i className="fas fa-play-circle"></i></button>
        <button className='btn btn-orange pull-left no-margin' onClick={props.cancel} type='Submit'> <i className="far fa-window-close"></i>Cancel</button>
      </form>
    </div >
  );
}

export default Checkboxes;