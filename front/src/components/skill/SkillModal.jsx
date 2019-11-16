import React from 'react';
import Modal from '../app/Modal';

const SkillsModal = ({ isModalOpen, closeModal, modalTitle, content, modifyContent, updateSkill, selectedId }) => {

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} >
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
  )

}

export default SkillsModal; 
