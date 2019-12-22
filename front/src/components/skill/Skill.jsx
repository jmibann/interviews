import React, { useState, useEffect } from 'react';
import { toastr } from 'react-redux-toastr';

import SkillInput from './SkillInput';
import { createSkill, getAllSkills, deleteSkill } from '../../../redux/action-creator/skill'

const Skill = () => {
  const [skillList, setSkillList] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [searchSkillInput, setSearchSkillInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllSkills = async () => await getAllSkills().then(skillList => {
      setSkillList(skillList);
      setIsLoading(false);
    });

    setIsLoading(true);
    fetchAllSkills();

  }, []);

  const handleChange = (e) => { setSkillInput(e.target.value) };


  const lowercaseOrderedString = (string) => {

    let orderedString = string.toLowerCase().replace(/\s+/g, ' ').split(' ');

    if (orderedString[0] === ' ') orderedString.shift();
    if (orderedString[orderedString.length - 1] === ' ') orderedString.pop();

    return orderedString.sort().join(' ');

  }

  const refreshTable = () => {
    setIsLoading(true);
    getAllSkills().then(skillList => {
      setSkillList(skillList);
      setIsLoading(false);
    });
  }

  const checkIfSkillSelected = () => { return  skillInput.trim() === ''}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIfSkillSelected()) {
      toastr.error('No skill selected', 'Skill field cannot be empty');
    } else {
      createSkill(lowercaseOrderedString(skillInput)).then(created => {
        if (created) {
          setSkillInput('');
          setIsLoading(true);
          getAllSkills().then(skillList => {
            setSkillList(skillList);
            setIsLoading(false);
            toastr.success('Skill was created successfully');
          })
        }
        else {
          toastr.error('Skill already exist!', 'Skill cannot be created because already exists');
        }
      });
    }
  }

  const handleChangeSearchSkills = (e) => { setSearchSkillInput(e.target.value) }

  const handleDelete = (e) => {
    let index = e.target.getAttribute('name');
    deleteSkill({ deleted: index }).then(() => getAllSkills().then(skillList => setSkillList(skillList)));
  };

  return (
    <SkillInput
      refreshTable={refreshTable}
      skillList={skillList}
      skillInput={skillInput}
      searchSkillInput={searchSkillInput}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSearch={handleChangeSearchSkills}
      isLoading={isLoading}
    />
  );

}

export default Skill;

