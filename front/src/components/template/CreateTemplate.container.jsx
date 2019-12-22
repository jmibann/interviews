import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';

import CreateTemplate from './CreateTemplate';

import { fetchTemplate, editTemplate } from '../../../redux/action-creator/template.js';
import { getAllSkills } from '../../../redux/action-creator/skill';
import { getQuestions, } from '../../../redux/action-creator/question';


const initialValue = { name: '', skills: [], questions: [] };

const CreateNewTemplate = ({ refreshGrid, history }) => {
  const [template, setTemplate] = useState(initialValue);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => await getAllSkills().then(skills => setSkillList(skills));
    const fetchQuestions = async () => await getQuestions().then(questions => setQuestions(questions))

    fetchSkills();
    fetchQuestions();

  }, [])

  const redirectGrid = () => { history.push('/configuration') };

  const compareArrays = (array, questions) => {
    let isEqual = true;
    array.forEach(arr => {
      if (questions.indexOf(arr.dataValues.id.toString()) < 0) {
        isEqual = false;
      }
    })
    return isEqual;
  }


  const validTemplate = () => {
    const name = template.name;
    const questions = template.questions;

    const nameExists = name.some(t => t.id !== id && t.name.toLowerCase() === name.toLowerCase());

    if (!nameExists) {
      const sameQuestions = questions.filter(t => t.id !== id && t.questions.length === questions.length && compareArrays(t.questions, questions));
      if (sameQuestions.length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  const addTemplate = (e) => {
    e.preventDefault();
    if (validTemplate()) {
      createTemplate(template).then(wasCreated => {
        if (wasCreated) {
          toastr.success('Template was created successfully');
          refreshGrid();
        } else {
          toastr.error('A template like this already exists')
        }
      })
    }
  }


  return (
    <div>
      {
        template && template.id
          ? <editTemplate
            template={template}
            skillList={skillList}
            refreshGrid={refreshGrid}
            // onChange={handleInputChange}
            selectedSkills={template.skills}
          // handleEditSubmit={editTemplateHandler}
          // handleEditSkillSubmit={handleSkillsSelection}
          />
          : <CreateTemplate 
            template={template}
            skillList={skillList}
            onSubmit={addTemplate}
            refreshGrid={refreshGrid}
            // onChange={handleInputChange}
            selectedSkills={selectedSkill}
            handleSelectedSkill={setSelectedSkill}
            redirectGrid={redirectGrid}
          // handleQuestion={handleQuestion}
          />
      }
    </div>
  );

}
export default CreateNewTemplate;