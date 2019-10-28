import { SET_CANDIDATE, SET_CANDIDATES, SET_MYCANDIDATES, SET_CANDIDATE_INTERVW_ID, SET_CANDIDATE_LIST, SET_SIZE_ALLCANDIDATES_LIST, SET_CANDIDATE_GROUP_LIST, SET_MY_CANDIDATE_GROUP_LIST } from '../constants';

const initialState = { candidate: {}, candidates: [], myCandidates: [], interviewID: {}, candidateList: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CANDIDATE:
      return Object.assign({}, state, { candidate: action.candidate });
    case SET_CANDIDATES:
      return Object.assign({}, state, { candidates: action.candidates });
    case SET_MYCANDIDATES:
      return Object.assign({}, state, { myCandidates: action.candidates });
    case SET_CANDIDATE_LIST:
      return Object.assign({}, state, { candidateList: action.candidates });
    case SET_CANDIDATE_GROUP_LIST:
      return Object.assign({}, state, { candidateList: action.candidateGoupList });
    case SET_MY_CANDIDATE_GROUP_LIST:
      return Object.assign({}, state, { candidateList: action.myCandidateGoupList });
    case SET_CANDIDATE_INTERVW_ID:
      return Object.assign({}, state, { interviewID: action.candidateInterviewID });
    case SET_SIZE_ALLCANDIDATES_LIST:
      return Object.assign({}, state, { totalCandidatesCount: action.totalCandidatesCount });
    default:
      return state;
  }
};
