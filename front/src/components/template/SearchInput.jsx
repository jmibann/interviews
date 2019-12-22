import React, { useState, useEffect } from 'react';
import Checkbox from '../app/Checkbox'

import './createtemplate.css';


function searchInput({ selectedSkills, setSelectedQuestions, selectedQuestions }) {


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDisabledToSubmit, setIsDisabledToSubmit] = useState(true);
  const [checked, setChecked] = useState(selectedQuestions.map(question => ({ ...question, isChecked: false })));


  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchResults(selectedQuestions);
  }, [selectedSkills]);

  useEffect(() => {

    const results = selectedQuestions.filter(question => {
      if (question.content.toLowerCase().includes(searchTerm)) return true;
      return false
    }
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleCheck = (id, isChecked) => {

    let aux = [];

    selectedQuestions.forEach(element => {
      if (element.id == id) element.mandatory = !isChecked;
      aux = [...aux, element];
    })

    setSelectedQuestions(aux);

    let checkedQuestions;
    let isDisabledToSubmit = true

    checkedQuestions = selectedQuestions.map(({ content, id, mandatory }) => ({ id: id, content: content, isChecked: (id == event.target.value) ? !isChecked : mandatory }));
    checkedQuestions.forEach(({ isChecked }) => {
      if (isChecked) isDisabledToSubmit = false;
    })
    setChecked(checkedQuestions);
    setIsDisabledToSubmit(isDisabledToSubmit);
  }

  return (
    <div className="padding">
      <input className='form-control inputLogin' type="text" placeholder="Type a question to search" value={searchTerm} onChange={handleChange} />
      <div className='questions-box'>
        <div className='all-selector-checkbox'></div>
        <div>
          <ul>
            {selectedQuestions.length >= 0 && searchTerm.length == 0
              ? <ul>{selectedQuestions.map(({ content, id, mandatory }) => (<Checkbox key={id + content} id={id} content={content} isChecked={mandatory} handleCheck={handleCheck} />))}</ul>
              : searchResults.map((item, index) => (<li key={index}><input checked={item.mandatory} onChange={() => handleCheck(item.id, item.mandatory)} className='questions' type='checkbox' /><label>{item.content}</label></li>))
            }
          </ul>
          <button className='btn btn-orange pull-right no-margin'
            // onClick={onSubmit} TODO:here we should implement a Modal where you will be able to see the questions you selected from the template
            type='Submit' disabled={isDisabledToSubmit}> See Preview </button>
        </div>
      </div>
    </div>
  );
}
export default searchInput;