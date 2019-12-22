import React from 'react';

import Modal from '../app/Modal';
import CreateTemplateContainer from './CreateTemplate.container';

const DELETE = 'DELETE';
const EDIT = 'EDIT'

const TemplateModals = ({ whichComponent, isModalOpen, closeModal, refreshTable, id, remove }) => {
  const renderModal = (whichComponent) => {


    switch (whichComponent) {
      case EDIT:
        return (
          <Modal id='modal' isOpen={isModalOpen} onClose={closeModal} title={'Edit candidate info'}>
            <div className='box-body'>
              <CreateTemplateContainer refreshTable={refreshTable} closeModal={closeModal} id={id} />
            </div>
          </Modal>

        );
      case DELETE:
        return (
          <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Delete candidate"}>
            <div className="box-body">
              <span> Are you sure you want to delete this template? </span>
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

export default TemplateModals;