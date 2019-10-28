import { SET_QUESTIONS, SET_HRQUESTIONS, SET_CANDIDATE_QUESTIONS, SET_QUESTIONSIS, SET_SKILL_ARRAY } from '../constants';
import axios from 'axios';

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions
});

const setHRQuestions = (questionsHR) => ({
  type: SET_HRQUESTIONS,
  questionsHR
});

const setCandidateQuestions = (candidateQuestions) => ({
  type: SET_CANDIDATE_QUESTIONS,
  candidateQuestions
});

const setQuestionsSis = (questionSIS) => {
  return {
    type: SET_QUESTIONSIS,
    questionSIS
  };
};


export const getQuestions = () => dispatch =>
  axios.get('/api/question/reqAllQuestions/')
    .then(res => dispatch(setQuestions(res.data)));

export const searchHRQuestions = () => dispatch =>
  axios.get('/api/question/searchHRQuestions/')
    .then(res => dispatch(setHRQuestions(res.data)));

export const deleteQuestion = (questId) => dispatch =>
  axios.get('/api/question/delete/' + questId)
    .then(() => dispatch(getQuestions()));

export const editQuestion = (questId, modifiedQuestion) => dispatch =>
  axios.post(`/api/question/edit/${questId}`, { content: modifiedQuestion }).then(() => dispatch(getQuestions()));


export const saveQuestionsFromFile = (questionsArray) => dispatch => {
  axios.post('/api/question/bulkCreate', questionsArray).then(() => dispatch(getQuestions()));
};

export const fetchCandidateQuestions = (skills) => dispatch => {
  let arrayIdSkills = [];
  for (let i in skills) {
    arrayIdSkills.push(skills[i].id);
  }

  axios.post('/api/question/candidateQuestions', { arrayIdSkills: arrayIdSkills })
    .then(response => {
      dispatch(setCandidateQuestions(response.data))
        ;
    });
};

export const fetchSisQuestions = (interviewID) => dispatch => {
  if (interviewID === null) return dispatch(setQuestionsSis([]));

  return axios.get(`/api/answer/getSisAnswers/${interviewID}`)
    .then(questions => dispatch(setQuestionsSis(questions.data)));
};


export const createQuestion = (content, skills, mandatory) => {
  return axios.post('/api/question/create', { content, skills, mandatory })
};

