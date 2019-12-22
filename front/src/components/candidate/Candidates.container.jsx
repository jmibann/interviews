import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../app/Button';
import CandidatesGrid from './CandidatesGrid';
import CandidateModals from './CandidateModals'

import { fetchCandidates, deleteCandidate } from '../../../redux/action-creator/candidate'

const ADD_NEW_CANDIDATE = 'ADD_NEW_CANDIDATE';
const DELETE = 'DELETE';
const EDIT = 'EDIT';

const Candidates = ({ user, history }) => {

  const [id, setId] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableState, setTableState] = useState({});
  const [whichComponent, setWhichComponent] = useState(null);

  useEffect(() => {
    const loadCandidates = async () => await fetchCandidates(user, 0, 100).then(candidates => {
      setCandidates(candidates);
      setIsLoading(false)
    })

    setIsLoading(true);
    loadCandidates();
  }, [])

  const toggleState = (whichComponent) => {
    setWhichComponent(whichComponent);
    setIsModalOpen(!isModalOpen);
  };

  const openAddCandidateModal = () => {
    setWhichComponent(ADD_NEW_CANDIDATE);
    setIsModalOpen(true)
  };

  const openEditCandidateModal = (id) => {
    setId(id);
    setWhichComponent(EDIT);
    setIsModalOpen(true)
  };

  const openDeleteModal = (id) => {
    setId(id);
    setWhichComponent(DELETE);
    setIsModalOpen(true)
  };

  const closeModal = (e) => { setIsModalOpen(false) };

  const refreshTable = () => {
    setIsLoading(true);
    let { pageSize, page, sorted, filtered } = { ...tableState };
    fetchCandidates(user, page, pageSize, sorted, filtered)
      .then(candidates => {
        setCandidates(candidates);
        setIsLoading(false);
      })
  }

  const remove = () => {

    deleteCandidate(id).then(() => refreshTable()).then(() => closeModal());
  }

  const openCandidate = () => { history.push('/addCandidate') };

  return (
    <div>
      {Object.keys(user).length
        ? <div>
          {isModalOpen
            ? <CandidateModals whichComponent={whichComponent} isModalOpen={isModalOpen} closeModal={closeModal} refreshTable={refreshTable} id={id} remove={remove} />
            : null}

          {user.isAdmin
            ? <Button text={"Add candidate "} type={"Button"} icon={"glyphicon glyphicon-plus"} onClick={openCandidate} />
            : null
          }
          <CandidatesGrid
            user={user}
            candidates={candidates}
            setCandidates={setCandidates}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setTableState={setTableState}
            refreshTable={refreshTable}
            openEditCandidateModal={openEditCandidateModal}
            openDeleteModal={openDeleteModal}
          />
        </div>
        : <Redirect to='/' />}
    </div>
  );

}

export default Candidates;