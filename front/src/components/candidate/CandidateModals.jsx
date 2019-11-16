import React from 'react';

import Modal from '../app/Modal';
import AddCandidateContainer from './AddCandidate.container';

const ADD_NEW_CANDIDATE = 'ADD_NEW_CANDIDATE';
const DELETE = 'DELETE';
const EDIT = 'EDIT'

const CandidateModals = ({ whichComponent, isModalOpen, closeModal, refreshTable, id, remove }) => {
  const renderModal = (whichComponent) => {

    switch (whichComponent) {
      case ADD_NEW_CANDIDATE:
        return (
          <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Add new candidate"} size={'lg'}>
            <div className="box-body">
              <AddCandidateContainer refreshTable={refreshTable} closeModal={closeModal} id={null} />
            </div>
          </Modal>
        );
      case EDIT:
        return (
          <Modal id='modal' isOpen={isModalOpen} onClose={closeModal} title={'Edit candidate info'}>
            <div className='box-body'>
              <AddCandidateContainer refreshTable={refreshTable} closeModal={closeModal} id={id} />
            </div>
          </Modal>

        );
      case DELETE:
        return (
          <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Delete candidate"}>
            <div className="box-body">
              <span> Are you sure you want to delete this candidate? </span>
              <button type="button" className="btn btn-secondary textModal" onClick={closeModal}>Cancel</button>
              <button type="button" className="btn btn-primary textModal" onClick={remove}>Yes</button>
            </div>
          </Modal>
        );
      default: return;
    }
  }
  return (<div>{renderModal(whichComponent)}</div>)
}

export default CandidateModals;