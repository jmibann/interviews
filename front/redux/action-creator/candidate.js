import { SET_CANDIDATE, SET_CANDIDATES, SET_CANDIDATE_INTERVW_ID, SET_CANDIDATE_LIST, SET_MYCANDIDATES } from '../constants';
import axios from 'axios';

const setCandidate = (candidate) => ({ type: SET_CANDIDATE, candidate });

const setCandidates = (candidates) => ({ type: SET_CANDIDATES, candidates });

const setCandidatesList = (candidates) => ({ type: SET_CANDIDATE_LIST, candidates });

const setMyCandidates = (candidates) => ({ type: SET_MYCANDIDATES, candidates });

const setMyCandidatesList = (candidates) => ({ type: SET_CANDIDATE_LIST, candidates });

const setInterviewID = (candidateInterviewID) => ({ type: SET_CANDIDATE_INTERVW_ID, candidateInterviewID });

export const createCandidate = (candidate) =>
  dispatch =>
    axios.post('/api/candidate/create', { candidate }).then(res => res.data).then(respuesta => {
      if (respuesta.error) return respuesta.error;
      else dispatch(setCandidate(respuesta));
    });

export const getAllCandidates = () => dispatch =>
  axios.get('/api/candidate/getAll').then(res => res.data).then(candidates => {
    dispatch(setCandidates(candidates));
    return candidates;
  });

export const getAllCandidatesList = () =>
  dispatch =>
    axios.get('/api/candidate/getAll').then(res => res.data).then(candidates => dispatch(setCandidatesList(candidates)));

export const fetchCandidate = (id) => dispatch => {
  return axios.get(`/api/candidate/getOne/${id}`).then(candidate => {
    dispatch(setCandidate(candidate.data));
    return candidate.data;
  }
  );
};

export const fetchMyCandidates = (userId) => dispatch => {
  axios.get('/api/candidate/getMyCandidates/' + userId).then(candidates => {
    dispatch(setMyCandidates(candidates.data));
    return candidates.data;
  });
};

export const fetchMyCandidatesList = (userId) => dispatch => {
  axios.get('/api/candidate/getMyCandidates/' + userId).then(candidates => {
    dispatch(setMyCandidatesList(candidates.data));
    return candidates.data;
  });
};

export const fetchCandidateInterview = (candID) => dispatch => {
  return axios.get('/api/candidate/getCandidateInterview/' + candID).then(response => dispatch(setInterviewID(response.data)));
};


export const fetchMyCandidatesGroupList = (pageNumber, pageSize, userId) => {
  return axios.get(`/api/candidate/sist/${userId}/group?page=${pageNumber}&pageSize=${pageSize}`).then(response => response.data);
};

export const fetchAllCandidatesListSize = (pageNumber, pageSize) => {
  return axios.get(`/api/candidate/RRHH/group?page=${pageNumber}&pageSize=${pageSize}`).then(response => response.data);
}

export const fetchAllCandidates = (pageNumber, pageSize, sorted, filtered) => {
  let desc = '';
  let filt = '';

  if (sorted) {
    for (let i in sorted) {
      desc += `&${sorted[i].id}Sorted=${sorted[i].desc}`;
    }
  }
  if (filtered) {
    for (let i in this.state.filtered) {
      filt += `&${this.state.filtered[i].id}=${this.state.filtered[i].value}`;
    }
  }

  return axios.get(`/api/candidate/RRHH/group?page=${pageNumber}&pageSize=${pageSize}`).then(response => response.data);
};