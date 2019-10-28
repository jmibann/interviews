import React from 'react';
import Button from '../app/Button'
import SkillsTable from './SkillsTable';

const AddSkill = (props) => {

  return (
    <div>
      <div id='searchBar'>
        <form onSubmit={props.handleSubmit}>
          <div className='skillPage'>
            <div>
              <input id='add-skill-input' placeholder='New skill' onChange={props.handleChange} name='skillInput' type='text' value={props.skillInput} maxLength="100" autoComplete="off" />
            </div>
            <Button text={'Add Skill'} type={'submit'} />
          </div>
        </form>
      </div>
      <div>
      </div>
      <div>
        <SkillsTable skillList={props.skillList} isLoading={props.isLoading} refreshTable={props.refreshTable} />
      </div>
    </div>
  );
};

export default AddSkill;