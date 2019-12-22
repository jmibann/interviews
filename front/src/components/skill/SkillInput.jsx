import React from 'react';
import Button from '../app/Button'
import SkillsTable from './SkillsTable';
import './createskill.css';

const AddSkill = ({ handleSubmit, handleChange, skillInput, skillList, isLoading, refreshTable }) => {

  return (
    <div>
      <div className='create-skill'>
        <form onSubmit={handleSubmit}>
          <div className='skillPage'>
            <div className='center-skill'>
              <input id='add-skill-input' placeholder='New skill' onChange={handleChange} name='skillInput' type='text' value={skillInput} maxLength="100" autoComplete="off" />
              <button className="btn btn-orange pull-left no-margin" type="submit">
                <span>Add skill </span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <SkillsTable skillList={skillList} isLoading={isLoading} refreshTable={refreshTable} />
      </div>
    </div>
  );
};

export default AddSkill;