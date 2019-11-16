import React from 'react';
import Button from '../app/Button'
import SkillsTable from './SkillsTable';

const AddSkill = ({ handleSubmit, handleChange, skillInput, skillList, isLoading, refreshTable }) => {

  return (
    <div>
      <div id='searchBar'>
        <form onSubmit={handleSubmit}>
          <div className='skillPage'>
            <div>
              <input id='add-skill-input' placeholder='New skill' onChange={handleChange} name='skillInput' type='text' value={skillInput} maxLength="100" autoComplete="off" />
            </div>
            <Button text={'Add Skill'} type={'submit'} />
          </div>
        </form>
      </div>
      <div>
      </div>
      <div>
        <SkillsTable skillList={skillList} isLoading={isLoading} refreshTable={refreshTable} />
      </div>
    </div>
  );
};

export default AddSkill;