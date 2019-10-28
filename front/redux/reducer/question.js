import { SET_QUESTIONS, SET_HRQUESTIONS, DELETE_QUESTION, EDIT_QUESTION, SET_CANDIDATE_QUESTIONS, SET_QUESTIONSIS, SET_SKILL_ARRAY } from '../constants';

const initialState = { allQuestions: [], questId: null, questions: [], candidateQuestions: [], questionSIS: [], questionsHR: [], skillArray: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_QUESTION:
      return Object.assign({}, state, { questId: action.questId });
    case EDIT_QUESTION:
      return Object.assign({}, state, { questId: action.questId });
    case SET_SKILL_ARRAY:
      return Object.assign({}, state, { skillArray: action.skillArray });
    case SET_QUESTIONSIS:
      return Object.assign({}, state, { questionSIS: action.questionSIS });
    case SET_QUESTIONS:
      return Object.assign({}, state, { allQuestions: action.questions });
    case SET_HRQUESTIONS:
      return Object.assign({}, state, { questionsHR: action.questionsHR });
    case SET_CANDIDATE_QUESTIONS:
      return Object.assign({}, state, { candidateQuestions: action.candidateQuestions });
    default:
      return state;
  }
};
