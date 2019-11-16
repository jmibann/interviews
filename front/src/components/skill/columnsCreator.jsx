import React from "react";
import matchSorter from 'match-sorter';

const columnsCreator = (onEditClick, setIsModalOpen) => {

  const columns = [{
    Header: 'SKILLS',
    id: 'skill',
    width: 800,
    accessor: d => d.skill,
    maxWidth: 800,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ['skill'] }),
    filterAll: true,

  },
  {
    Header: 'ACTIONS',
    accessor: 'details',
    width: 200,
    filterable: false,
    Cell: (props) => {
      return (
        <div style={{ margin: '10px', textAlign: 'center' }}        >
          <i
            className="fas fa-pencil-alt"
            onClick={() => onEditClick(props.original.id, props.original.skill)}>
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