import Axios from 'axios';

import { SET_CANDIDATE, SET_CANDIDATE_INTERVW_ID } from '../constants';

const setCandidate = (candidate) => ({ type: SET_CANDIDATE, candidate });

const setInterviewID = (candidateInterviewID) => ({ type: SET_CANDIDATE_INTERVW_ID, candidateInterviewID });

export const createCandidate = (candidate) => {

  return (Axios.post('/api/candidate/create', candidate).then(res => res.data));
}

export const fetchCandidate = (id) => {
  return Axios.get(`/api/candidate/getOne/${id}`).then(result => result.data);
};

export const deleteCandidate = (id) => {
  return Axios.delete(`/api/candidate/${id}`)
}

export const editCandidate = (candidateID, modifiedCandidate) => {

  return Axios.put(`/api/candidate/edit/${candidateID}`, modifiedCandidate).then(response => response.data)
}

export const fetchCandidateInterview = (candID) => dispatch => {
  return Axios.get('/api/candidate/getCandidateInterview/' + candID).then(response => dispatch(setInterviewID(response.data)));
};

const URIMaker = (user, pageNumber, pageSize, sorted, filtered) => {
  let desc = '';
  let filt = '';
  let URI = '';

  if (sorted) {
    for (let i in sorted) {
      desc += `&${sorted[i].id}Sorted=${sorted[i].desc}`;
    }
  }
  if (filtered) {
    for (let i in filtered) {
      filt += `&${filtered[i].id}=${filtered[i].value}`;
    }
  }

  return URI = `/api/candidate/${user.id}/group?isAdmin=${user.isAdmin}&page=${pageNumber}&pageSize=${pageSize}` + desc + filt
}

export const fetchCandidates = (user, pageNumber, pageSize, sorted, filtered) => {
  return Axios.get(URIMaker(user, pageNumber, pageSize, sorted, filtered)).then(response => response.data)
};
