import React from 'react';
import { connect } from 'react-redux';
import ReactFileReader from 'react-file-reader';

import { saveQuestionsFromFile } from '../../../redux/action-creator/question';
import { saveSkillsFromFile } from '../../../redux/action-creator/skill';


const AddQuestionDropdown = ({ onClick, saveSkillsFromFile, saveQuestionsFromFile }) => {

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

      saveSkillsFromFile(arrayNonDuplicatedSkills).then(() => saveQuestionsFromFile(result))
    };

    reader.readAsText(files[0]);
  }

  return (
    <div className="inline-block form-group">
      <div className="dropdown">
        <button className="btn btn-orange pull-right no-margin dropdown-toggle" type="button" data-toggle="dropdown">
          <span>Add questions </span>
          <span className="glyphicon glyphicon-plus"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-right custom-dropdown">
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


const mapDispatchToProps = (dispatch) => ({
  saveSkillsFromFile: (questionsArray) => dispatch(saveSkillsFromFile(questionsArray)),
  saveQuestionsFromFile: (questionsArray) => dispatch(saveQuestionsFromFile(questionsArray)),
});

export default connect(null, mapDispatchToProps)(AddQuestionDropdown);