import React from 'react';

import Modal from '../app/Modal';
import AddQuestion from './AddQuestion.container';

const QuestionModal = ({whichComponent, isModalOpen, closeModal, refreshGrid, selectedContent, setModifiedQuestion, edit, removeQuestion}) => {
    switch (whichComponent) {
      case 'addNewQuestionModal':
        return (
          <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Add question"}>
            <div className="box-body">
              <AddQuestion closeModal={closeModal} refreshGrid={refreshGrid} />
            </div>
          </Modal>
        );
      case 'editQuestionModal': return (
        <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Edit question"}>
          <div className="box-body">
            <div className="modal-body">
              <textarea className="form-control textModal" aria-label="With textarea" value={selectedContent} onChange={setModifiedQuestion}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-orange btn-cancel-modal" onClick={closeModal}>Cancel</button>
              <button type="button" className="btn btn-orange pull-right" onClick={edit}>Change</button>
            </div>
          </div>
        </Modal>
      );
      case 'deleteQuestionModal':
        return (
          <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Delete question"}>
            <div className="box-body">
              <span> Are you sure you want to delete this question permanently? </span>
              <button className="btn btn-secondary" type="button" onClick={closeModal}>Cancel</button>
              <button className="btn btn-orange" type="button" onClick={removeQuestion}>Yes</button>
            </div>
          </Modal>
        );
      default: return;
    }
  }

  export default QuestionModal;