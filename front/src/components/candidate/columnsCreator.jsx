import React, { useState, useEffect } from 'react';
import matchSorter from 'match-sorter';
import { Link } from 'react-router-dom';

import { getSkillArray } from '../../../redux/action-creator/skill';

const columnsCreator = (user, openDeleteModal, openEditCandidateModal) => {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => await getSkillArray().then(skills => setSkills(skills));

    fetchSkills();
  }, []);

  let columns = [{
    Header: 'CANDIDATE',
    id: 'fullName',
    accessor: d => d.fullName,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['fullName'] }),
    Cell: (d) => {
      return (
        (<Link to={`/candidate/info/${d.original.id}`}>{d.original.fullName}</Link>)
      )
    },
    filterAll: true
  }, {
    Header: 'SKILLS',
    sortable: false,
    id: 'skills',
    accessor: d => d.skills,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ['skills'] }),
    filterAll: true,
    Filter: ({ filter, onChange }) => {
      return (
        <select onChange={event => { onChange(event.target.value); }} value={filter ? filter.value : 'all'}>
          <option value="">All</option>
          {skills ? skills.map(skill => (<option value={skill} key={skill}>{skill}</option>)) : null}
        </select >
      );
    }
  }, {
    Header: 'STATUS',
    sortable: false,
    id: 'status',
    accessor: d => d.status,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ['status'] }),
    filterAll: true,
    Cell: (props) => {
      return (<div style={{ textAlign: 'center' }} >
        <div id='candStatus'> {props.value}</div>
      </div>
      );
    },
    Filter: ({ filter, onChange }) => {
      return (
        <select onChange={event => { onChange(event.target.value); }} value={filter ? filter.value : 'all'}>
          <option value="" key={'a1'}>All</option>
          <option value="New" key={'a2'}>New</option>
          <option value="Started" key={'a3'}>Started</option>
          <option value="Approved" key={'a4'}>Approved</option>
          <option value="Rejected" key={'a5'}>Rejected</option>
        </select>
      );
    }
  }]

  if (user.isAdmin) {

    columns = [...columns, {
      Header: 'ASSIGNED TO ME',
      sortable: false,
      id: 'myCandidates',
      accessor: d => d.myCandidates,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['myCandidates'] }),
      filterAll: true,
      Cell: ({ value }) => {
        return (<div style={{ textAlign: 'center' }} >
          <div > {value ? "Yes" : "No"}</div>
        </div>
        );
      },
      Filter: ({ filter, onChange }) => {
        return (
          <select onChange={event => { onChange(event.target.value); }} value={filter ? filter.value : 'all'}>
            <option value="" key={'a1'}>All</option>
            <option value="true" key={'a2'}>Yes</option>
            <option value="false" key={'a3'}>No</option>
          </select>
        );
      }
    }]
  }

  columns = [...columns, {
    Header: 'ACTIONS',
    accessor: 'details',
    filterable: false,
    Cell: (props) => {
      return (
        <div className='icon-centerer'>
          <i onClick={() => openEditCandidateModal(props.original.id)} className="fas fa-pencil-alt"></i>
          <i onClick={() => openDeleteModal(props.original.id)} className="far fa-trash-alt"></i>
        </div>
      );
    },
    sortable: false
  }
  ];

  return columns
}

export default columnsCreator;