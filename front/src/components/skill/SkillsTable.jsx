import React, { useState } from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Pagination from '../../helpers/Pagination';

import Modal from '../app/Modal';
import { modifySkill } from '../../../redux/action-creator/skill';

const SkillsTable = ({ refreshTable, skillList, isLoading }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [content, setContent] = useState(null);


  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
  }
  const onEditClick = (id, content) => {
    setContent(content);
    setSelectedId(id);
    setModalTitle('Edit Skill');
    setIsModalOpen(true);

  }
  const modifyContent = (e) => {
    setContent(e.target.value);
  }
  const updateSkill = (id, content) => {
    modifySkill(id, content.toLowerCase()).then(res => {
      if (res) {
        setSelectedId(null);
        setContent(null);
        refreshTable();
        setIsModalOpen(false);
      } else {
        toastr.error('Skill already exists');
      }

    }
    )
  }

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
        <div
          style={{ margin: '10px', textAlign: 'center' }}
        >
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

  return (
    <div>
      {isModalOpen
        ? <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} >
          <div className="box-body">
            <div className="modal-body">
              <textarea className="form-control textModal" aria-label="With textarea" value={content}
                onChange={modifyContent}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className='btn btn-orange' onClick={closeModal}>Cancel</button>
              <button type="button" className='btn btn-orange pull-right' onClick={() => updateSkill(selectedId, content)}>Edit</button>
            </div>
          </div>
        </Modal>
        : null}

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={skillList}
          previousText="<"
          nextText=">"
          PaginationComponent={Pagination}
          isLoading={isLoading}
          filterable
          minRows={0}
          defaultPageSize={10}
          getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
        />

      </div>
    </div >
  )
}

export default SkillsTable;