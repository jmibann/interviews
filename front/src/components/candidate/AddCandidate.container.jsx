import React, { useEffect, useState } from 'react';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

import AddCandidateComp from './AddCandidate';
import EditCandidate from './EditCandidate';

import { getAllSkills } from '../../../redux/action-creator/skill'
import { createCandidate, fetchCandidate, editCandidate } from '../../../redux/action-creator/candidate';

const initialValue = { fullName: '', skypeId: '', email: '', telNumber: '', expertise: '', skills: [] };

const AddCandidate = ({ id, refreshTable, closeModal }) => {

  const [candidate, setCandidate] = useState(initialValue);
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => await getAllSkills().then(skills => setSkillList(skills));
    const loadCandidate = async (id) => await fetchCandidate(id).then(candidate => setCandidate(candidate));


    fetchSkills();
    if (id) {
      loadCandidate(id);
    }
  }, [])

  const checkFields = () => {
    if (!candidate.fullName || !candidate.email) {
      toastr.warning('Missing fields...', 'You must complete required fields in order to continue.');
      return false;
    } else if (candidate.email.indexOf('@') === -1) {
      toastr.warning('Invalid Email format.', 'Please check your mail address');
      return false;
    } else if (!candidate.skills.length) {
      toastr.warning('Skill field empty', 'Skill field cannot be empty ');
      return false;
    } else if (candidate.email.indexOf(' ') !== -1) {
      toastr.warning('Wrong e-mail address', 'e-mail address cannot contain blank spaces');
      return false;
    }
    return true;
  }

  const addCandidate = (e) => {
    e.preventDefault();
    if (checkFields()) {
      createCandidate({ ...candidate, status: 'New' }).then(wasCreated => {
        if (wasCreated) {
          toastr.success('Candidate was created successfully');
          refreshTable();
          closeModal();
        } else {
          toastr.error('e-mail already exist');
        }
      })
    }
  }


  const editCandidateHandler = (e) => {
    e.preventDefault();

    if (checkFields()) {

      let candidateCopy = candidate;

      if (typeof candidate.skills[0] !== 'number') {
        candidateCopy.skills = candidate.skills.map(skill => skill.id);
      }

      editCandidate(candidate.id, candidateCopy).then(wasUpdated => {
        if (wasUpdated) {
          refreshTable();
          closeModal();
        } else {
          toastr.error('e-mail already exist');
        }
      })
    }
  }

  const handleInputChange = (e) => {
    let candidateCopy = { ...candidate, [e.target.name]: e.target.value };
    setCandidate(candidateCopy);
  }

  const handleSkillsSelection = (skills) => {

    let candidateCopy = { ...candidate, skills };
    setCandidate(candidateCopy);

  }

  return (
    < div >
      {
        candidate && candidate.id
          ? <EditCandidate
            candidate={candidate}
            skillList={skillList}
            closeModal={closeModal}
            refreshTable={refreshTable}
            onChange={handleInputChange}
            selectedSkills={candidate.skills}
            handleEditSubmit={editCandidateHandler}
            handleEditSkillSubmit={handleSkillsSelection}
          />
          : <AddCandidateComp
            candidate={candidate}
            skillList={skillList}
            closeModal={closeModal}
            onSubmit={addCandidate}
            refreshTable={refreshTable}
            onChange={handleInputChange}
            selectedSkills={candidate.skills}
            handleSkillSubmit={handleSkillsSelection}
          />
      }
    </div >
  );

}

export default AddCandidate;
