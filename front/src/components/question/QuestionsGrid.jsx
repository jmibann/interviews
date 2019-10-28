import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import matchSorter from 'match-sorter';
import Pagination from '../../helpers/Pagination';

import { getSkillArray } from '../../../redux/action-creator/skill';
import { getQuestions, deleteQuestion, editQuestion } from '../../../redux/action-creator/question';

import Modal from '../app/Modal';
import AddQuestion from './AddQuestion.container';
import AddQuestionDropdown from './AddQuestionDropdown';

const QuestionsGrid = ({ questions,getQuestions, skillArray, getSkillArray, editQuestion, deleteQuestion }) => {

  const [whichComponent, setWhichComponent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions4ReactTable, SetQuestions4ReactTable] = useState([]);
  const [selectedID, setSelectedId] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);


  useEffect(() => {
    const fetchQuestions = async () => await getQuestions();

    fetchQuestions();
  }, [])

  useEffect(() => {
    const fetchSkillArray = async () => await getSkillArray();

    fetchSkillArray();
  }, [])


  const setSelectedQuestion = (id, content, whichComponent) => {
    setSelectedId(id);
    setSelectedContent(content);
    setWhichComponent(whichComponent);
    setIsModalOpen(!isModalOpen);
  }

  const setModifiedQuestion = (e) => { setSelectedContent(e.target.value) }

  const edit = () => {
    editQuestion(selectedID, selectedContent);
    closeModal();
  }

  const removeQuestion = () => {
    deleteQuestion(selectedID);
    closeModal();
  }

  const toggleState = (whichComponent) => {
    setIsModalOpen(!isModalOpen);
    setWhichComponent(whichComponent)
  };

  const closeModal = () => { setIsModalOpen(false) }

  const openModal = () => { toggleState("addNewQuestionModal") }

  const modalRenderer = () => {
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
              <button type="button" onClick={closeModal}>Cancel</button>
              <button type="button" onClick={edit}>Change</button>
            </div>
          </div>
        </Modal>
      );
      case 'deleteQuestionModal':
        return (
          <Modal id="modal" isOpen={isModalOpen} onClose={closeModal} title={"Delete question"}>
            <div className="box-body">
              <span> Are you sure you want to delete this question permanently? </span>
              <button type="button" onClick={closeModal}>Cancel</button>
              <button type="button" onClick={removeQuestion}>Yes</button>
            </div>
          </Modal>
        );
      default: return;
    }
  }

  const columns = [{
    Header: 'QUESTION',
    id: 'content',
    accessor: d => d.content,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['content'] }),
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
        {skillArray ? skillArray.map(skill => (<option value={skill} key={skill}>{skill}</option>)) : null}
      </select>
  },
  {
    Header: 'MANDATORY',
    sortable: false,
    id: 'mandatory',
    accessor: d => d.mandatory,
    width: 100,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['mandatory'] }),
    filterAll: true,
    Filter: ({ filter, onChange }) => (
      <select onChange={event => onChange(event.target.value)} style={{ width: '100%' }} value={filter ? filter.value : 'all'} >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>),
    Cell: (props) => (<div className={'icon-centerer'}>
      {props.original.mandatory ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i>}
    </div>)
  },
  {
    Header: 'ACTIVE',
    sortable: false,
    id: 'active',
    accessor: d => d.active,
    width: 100,
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['active'] }),
    filterAll: true,
    Filter: ({ filter, onChange }) => (
      <select onChange={event => onChange(event.target.value)} style={{ width: '100%' }} value={filter ? filter.value : 'all'} >
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>),
    Cell: (props) => (<div className={'icon-centerer'}>
      {props.original.active ? <i className="far fa-check-circle green"></i> : <i className="far fa-times-circle red"></i>}
    </div>)
  },
  {
    Header: 'ACTIONS',
    accessor: 'details',
    width: 200,
    filterable: false,
    Cell: (props) => {
      return (
        <div className={'icon-centerer'}>
          <i
            className="fas fa-pencil-alt"
            onClick={() => setSelectedQuestion(props.original.id, props.original.content, 'editQuestionModal')}
          ></i>

          <i
            className="far fa-trash-alt"
            onClick={() => setSelectedQuestion(props.original.id, props.original.content, 'deleteQuestionModal')}
            style={{ marginLeft: '10px' }}
          ></i>
        </div>
      );
    },
    sortable: false
  }
  ];


  if (!!questions && questions[0] && Array.isArray(questions[0].skills)) {
    let copyCandidates = questions;
    for (let i = 0; i < questions.length; i += 1) {
      let pepe = [];
      copyCandidates[i].skills.map(skill => pepe.push(skill.skill));
      copyCandidates[i].skills = pepe.join(' - ');
    }
    SetQuestions4ReactTable(copyCandidates);
  }

  return (
    <div>

      {isModalOpen ? modalRenderer() : null}

      <AddQuestionDropdown onClick={openModal} />

      <div className='react-table'>
        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={questions4ReactTable}
          previousText="<"
          nextText=">"
          PaginationComponent={Pagination}
          filterable
          minRows={0}
          getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
        />
      </div>
    </div>
  );

};

const mapStateToProps = (state) => ({
  questions: state.question.allQuestions,
  skillArray: state.question.skillArray
});
const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(getQuestions()),
  getSkillArray: () => dispatch(getSkillArray()),
  deleteQuestion: (id) => dispatch(deleteQuestion(id)),
  editQuestion: (questId, modifiedQuestion) => dispatch(editQuestion(questId, modifiedQuestion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsGrid);
