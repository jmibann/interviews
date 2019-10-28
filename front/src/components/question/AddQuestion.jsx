import React from 'react';
import SkillInput from './SkillInput';


const AddQuestion = ({ setQuestionContent, skills, setQuestionSkills, isMandatory, onChange, closeModal, finalSubmit }) => {
    return (
        <div className={'add-question-input-modal'}>
            <div className={'add-question-content'}>
                <label >Question content: </label>
                <textarea type='textbox' name='question' onChange={setQuestionContent} className='question-textbox' />
            </div>

            <div className={'skill-input'}>
                <SkillInput options={skills} setQuestionSkills={setQuestionSkills} />
            </div>

            <div className={'mandatory-input'}>
                <input type='checkbox' value={isMandatory} onChange={onChange} />
                <label className={'mandatory-text'}>Mandatory</label>
            </div>

            <div className={'add-question-footer'}>
                <button type="button" className="btn btn-orange btn-cancel-modal" onClick={closeModal} >Close</button>
                <button className="btn btn-orange pull-right" onClick={finalSubmit} >Create</button>
            </div>
        </div>

    )
}

export default AddQuestion;