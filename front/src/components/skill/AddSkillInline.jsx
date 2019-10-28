import React from 'react';

const AddSkillInline = (props) => {
  return (
    <div style={{ marginTop: '25px' }}>
      <label htmlFor="url" className='pull-left' style={{ margin: '8px 5px 8px' }} >Skills</label>
      <div>
        <br />
        <div className="dropdown" style={{ display: 'inline-block' }}>
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select skills
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.skillList.map((skill, idx) => {
              return (<button key={idx+skill.skill} className="dropdown-item" value={skill.id} onClick={props.handleSkillSubmit}>{skill.skill}</button>);
            })}
          </div>
        </div>
      </div>

      {props.selectedSkills.length > 0 && <p style={{ fontSize: '15px', fontStyle: 'italic' }}>Click on skill to delete it</p>}

      {props.selectedSkills.length > 0 && <h3 style={{ float: 'left', marginLeft: '20px', color: '#EC6861' }}> | </h3>}

      <div style={{ float: 'left', padding: '1%' }}>
        {props.selectedSkills.map((id, i) => {
          return <p style={{ float: 'left', marginLeft: '20px', color: 'red', cursor: 'pointer' }} onClick={props.handleDelete} key={props.selectedSkills[i].id} value={i} >{[props.selectedSkills[i].skill]}</p>;
        })
        }
      </div>
    </div >
  );
};

export default AddSkillInline;