import React from 'react';
import SkillInput from '../question/SkillInput';


const Candidate = (props) => {
	const candidate = props.candidate;
	return (
		< div >
			<div>
				<div className='addCandidateDiv' >
					<label htmlFor="firstName" className='pull-left'>Full Name: </label><span aria-hidden="true" className='red'>*</span>
					<input value={candidate.fullName} onChange={props.onChange} type="text" maxLength="200" className="form-control inputLogin" id="Full name" placeholder="Full Name" name='fullName' />
				</div>
				<div className='addCandidateDiv pull-left'>
					<label htmlFor="skypeId" className='pull-left'>Skype ID: </label>
					<input value={candidate.skypeId} onChange={props.onChange} type="text" maxLength="200" className="form-control inputLogin" id="Skype ID" placeholder="Skype ID" name='skypeId' />
				</div>
			</div>

			<div>
				<div className='addCandidateDiv'>
					<label htmlFor="email" className='pull-left'>Email: </label><span aria-hidden="true" className='red'>*</span>
					<input value={candidate.email} onChange={props.onChange} type="text" className="form-control inputLogin" id="Email" placeholder="Email" name='email' />
				</div>

				<div className='addCandidateDiv'>
					<label htmlFor="number" className='pull-left'>Phone Number: </label>
					<input value={candidate.telNumber} onChange={props.onChange} type="tel" className="form-control inputLogin" id="phone" placeholder="Phone Number" name='telNumber' />
				</div>
			</div>

			<label htmlFor="skill" className='pull-left'>Skill: </label> <span aria-hidden="true" className='red'>*</span>
			<div className='addCandidateDiv' style={{ width: "100%" }}>
				<SkillInput options={props.skillList} setQuestionSkills={props.handleEditSkillSubmit} initialSelected={candidate.skills} />
			</div>

			<div className='addCandidateDiv' style={{ width: "100%" }}>
				<label htmlFor="workExperience">Work Experience</label>
				<textarea value={candidate.expertise} onChange={props.onChange} className="form-control inputLogin" style={{ width: "100%", height: "259px", resize: "none" }} id="WorkExperience" rows="3" name="expertise"></textarea>
				<span aria-hidden="true" className='red'>*Required field</span>
			</div>

			<div className='addCandidateDiv'>
				<button type="button" className="btn btn-secondary" onClick={props.closeModal}>Cancel</button>
				<button type="submit" className="btn btn-orange" onClick={props.handleEditSubmit}>Save</button>
			</div>
		</div >
	);
};

export default Candidate;