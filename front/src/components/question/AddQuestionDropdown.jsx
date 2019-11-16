import React from 'react';
import ReactFileReader from 'react-file-reader';

import { saveQuestionsFromFile } from '../../../redux/action-creator/question';
import { saveSkillsFromFile } from '../../../redux/action-creator/skill';


const AddQuestionDropdown = ({ onClick, refreshGrid }) => {

  const handleFiles = (files) => {
    let quoteRemover = function (str) {
      let arr = str.slice(1, str.length - 1);
      return arr;
    };
    var reader = new FileReader();
    reader.onload = (e) => {
      let csv = reader.result;
      let lines = csv.split('\n');
      let result = [];
      let obj = {};
      let currentline;
      let array;
      for (var i = 0; i < lines.length; i++) {
        currentline = lines[i].split(';');
        array = JSON.parse(currentline[2]);
        array = array.map(skill => skill.toLowerCase());

        obj = {
          content: quoteRemover(currentline[0]),
          mandatory: currentline[1] === 'true' ? true : false,
          skills: array,
        };
        result.push(obj);
      }

      let arrayNonDuplicatedSkills = [];

      result.forEach(obj => obj.skills.forEach(skill => {
        if (arrayNonDuplicatedSkills.indexOf(skill) < 0) {
          arrayNonDuplicatedSkills = [...arrayNonDuplicatedSkills, skill];
        }
      }))

      saveSkillsFromFile(arrayNonDuplicatedSkills).then(() => saveQuestionsFromFile(result)).then(() => refreshGrid());
    };

    reader.readAsText(files[0]);
  }

  return (
    <div className="inline-block form-group add-question-dpdw">
      <div className="dropdown">
        <button className="btn btn-orange pull-left no-margin dropdown-toggle" type="button" data-toggle="dropdown">
          <span>Add questions </span>
          <span className="glyphicon glyphicon-plus"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-left custom-dropdown">
          <li>
            <button onClick={onClick}>Add new question manually</button>
          </li>
          <li>
            <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
              <button className="dropdown-item probando2">Upload questions from file</button>
            </ReactFileReader>
          </li>
        </ul>
      </div>
    </div>
  )

}

export default AddQuestionDropdown;