import React from "react";
import { useState, useEffect } from 'react';
import matchSorter from 'match-sorter';
import { getSkillArray } from '../../../redux/action-creator/skill';
import { Link } from 'react-router-dom';

const columnsCreator = (onEditClick, setIsModalOpen) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => await getSkillArray().then(skills => setSkills(skills));

    fetchSkills();
  }, []);

  const columns = [{
    Header: 'INTERVIEW NAME',
    id: 'template',
    accessor: d => d.template,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['template'] }),
    Cell: (d) => {
      return (
        (<Link to={`/templates/${d.original.id}`}>{d.original.name}</Link>)
      )
    },
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
    Header: 'CREATED BY',
    id: 'user',
    accessor: d => d.user,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['user'] }),
    filterAll: true
  },
  {
    Header: 'ACTIONS',
    accessor: 'details',
    width: 200,
    filterable: false,
    Cell: (props) => {
      return (
        <div style={{ margin: '10px', textAlign: 'center' }}>
          <i
            className="fas fa-pencil-alt"
            onClick={() => onEditClick(true)}>
          </i>
          <i
            className="far fa-trash-alt"
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: '10px' }}></i>
        </div>
      );
    },
    sortable: false
  }
  ];

  return columns;

}

export default columnsCreator;