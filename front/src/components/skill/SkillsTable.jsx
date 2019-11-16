import React, { useState } from 'react';
import ReactTable from 'react-table';
import Pagination from '../../helpers/Pagination';

import SkillsModal from './SkillModal';
import columnsCreator from './columnsCreator';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

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
        setContent("");
        props.refreshTable();
        setIsModalOpen(false);
      } else {
        toastr.error('Skill already exists');
      }

    }
    )
  }

  const columns = columnsCreator(onEditClick, setIsModalOpen);

  return (
    <div>
      {isModalOpen
        ? <SkillsModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalTitle={modalTitle}
          content={content}
          modifyContent={modifyContent}
          updateSkill={updateSkill}
          selectedId={selectedId}
        />
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