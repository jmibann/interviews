import React, { useState, useEffect } from 'react';
import matchSorter from 'match-sorter';

import { getSkillArray } from '../../../redux/action-creator/skill';

const columnsCreator = (setSelectedQuestion) => {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkillArray = async () => await getSkillArray().then(skills => setSkills(skills));

    fetchSkillArray();
  }, [])

  const columns = [{
    Header: 'QUESTION',
    id: 'content',
    accessor: d => d.content,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['content'] }),
    filterAll: true
  },
  {
    Header: 'SKILL',
    sortable: false,
    id: 'skills',
    accessor: d => d.skills,
    width: 300,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['skills'] }),
    filterAll: true,
    Filter: ({ filter, onChange }) =>
      <select onChange={event => onChange(event.target.value)} style={{ width: '100%' }} value={filter ? filter.value : 'all'} >
        <option value="">All</option>
        {skills.map(skill => (<option value={skill} key={skill}>{skill}</option>))}
      </select>
  },
  {
    Header: 'MANDATORY',
    sortable: false,
    id: 'mandatory',
    accessor: d => d.mandatory,
    width: 100,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['mandatory'] }),
    filterAll: true,
    Filter: ({ filter, onChange }) => (
      <select onChange={event => onChange(event.target.value)} style={{ width: '100%' }} value={filter ? filter.value : 'all'} >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>),
    Cell: (props) => (<div className={'icon-centerer'}>
      {props.original.mandatory ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i>}
    </div>)
  },
  {
    Header: 'ACTIVE',
    sortable: false,
    id: 'active',
    accessor: d => d.active,
    width: 100,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['active'] }),
    filterAll: true,
    Filter: ({ filter, onChange }) => (
      <select onChange={event => onChange(event.target.value)} style={{ width: '100%' }} value={filter ? filter.value : 'all'} >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>),
    Cell: (props) => (<div className={'icon-centerer'}>
      {props.original.active ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i>}
    </div>)
  },
  {
    Header: 'ACTIONS',
    accessor: 'details',
    width: 200,
    filterable: false,
    Cell: (props) => {
      let { active, id, content } = props.original
      return (
        <div className={'icon-centerer'}>
          <button type="button" disabled={!active} className="btn" onClick={() => (active) ? setSelectedQuestion(id, content, 'editQuestionModal') : null}><i className="fas fa-pencil-alt"></i></button>
          <button type="button" disabled={!active} className="btn" onClick={() => (active) ? setSelectedQuestion(id, content, 'deleteQuestionModal') : null}><i className="far fa-trash-alt"></i></button>
        </div>
      );
    },
    sortable: false
  }
  ]

  return columns
}

export default columnsCreator;
