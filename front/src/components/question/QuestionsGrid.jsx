import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Pagination from '../../helpers/Pagination';
import { toastr, actions as toastrActions } from 'react-redux-toastr';

import { getQuestions, logicDeleteQuestion, editQuestion } from '../../../redux/action-creator/question';

import QuestionModal from './questionModal'
import AddQuestionDropdown from './AddQuestionDropdown';
import columnsCreator from './columnsCreator';

const QuestionsGrid = () => {

  const [whichComponent, setWhichComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedID, setSelectedId] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchQuestions = async () => await getQuestions().then(questions => setQuestions(questions)).then(() => setIsLoading(false));

    setIsLoading(true);
    fetchQuestions();
  }, [])

  const setSelectedQuestion = (id, content, whichComponent) => {
    setSelectedId(id);
    setSelectedContent(content);
    setWhichComponent(whichComponent);
    setIsModalOpen(!isModalOpen);
  }

  const setModifiedQuestion = (e) => { setSelectedContent(e.target.value) }

  const refreshTable = (questions) => { setQuestions(questions) };

  const checkEmptyContent = (selectedContent) => {
    if (selectedContent.length) {
      return false
    }
    else {
      return true;
    }
  }

  const edit = () => {
    if (checkEmptyContent(selectedContent)) {
      return toastr.error('Empty entry', 'Question cannot be empty')
    }
    editQuestion(selectedID, selectedContent).then(wasUpdated => {
      if (wasUpdated) {
        refreshGrid();
        closeModal();
        toastr.success('Question successfully updated');
      } else {
        toastr.error('Question already exists', 'Question cannot be duplicated');
      }
    })
  }

  const removeQuestion = () => {
    closeModal();
    setIsLoading(true);
    logicDeleteQuestion(selectedID).then(questions => refreshTable(questions)).then(() => setIsLoading(false));
  }

  const toggleState = (whichComponent) => {
    setIsModalOpen(!isModalOpen);
    setWhichComponent(whichComponent)
  };

  const closeModal = () => { setIsModalOpen(false) }

  const openModal = () => { toggleState("addNewQuestionModal") }

  const refreshGrid = () => {
    setIsLoading(true);
    getQuestions().then(questions => refreshTable(questions)).then(() => setIsLoading(false))
  }

  const columns = columnsCreator(setSelectedQuestion);

  return (
    <div>

      {isModalOpen
        ? <QuestionModal
          edit={edit}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          refreshGrid={refreshGrid}
          removeQuestion={removeQuestion}
          whichComponent={whichComponent}
          selectedContent={selectedContent}
          setModifiedQuestion={setModifiedQuestion}
        />
        : null}

      <AddQuestionDropdown onClick={openModal} refreshGrid={refreshGrid} closeModal={closeModal} />

      <div className='react-table'>
        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={questions}
          previousText="<"
          nextText=">"
          PaginationComponent={Pagination}
          filterable
          minRows={0}
          defaultPageSize={100}
          loading={isLoading}
          getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
        />
      </div>
    </div>
  );

};

export default QuestionsGrid;
