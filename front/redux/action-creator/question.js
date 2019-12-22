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


export const getQuestions = () => {
  return axios.get('/api/question/reqAllQuestions/')
    .then(res => res.data)
    .then(questions => {
      questions.forEach(question => question.skills = question.skills.map(skill => skill.skill).sort().join(' - '));
      return questions
    })
    .then(questions => questions);
}

export const searchHRQuestions = () => dispatch =>
  axios.get('/api/question/searchHRQuestions/').then(res => dispatch(setHRQuestions(res.data)));

export const deleteQuestion = (id) => {
  return axios.get('/api/question/delete/' + id).then(() => getQuestions());
}

export const logicDeleteQuestion = (id) => {
  return axios.get('/api/question/logicDelete/' + id).then(() => getQuestions());
}

export const editQuestion = (questionId, modifiedQuestion) => {
  return axios.put(`/api/question/edit/${questionId}`, { content: modifiedQuestion }).then(res => res.data);
}

export const saveQuestionsFromFile = (questionsArray) => {
  axios.post('/api/question/bulkCreate', questionsArray).then(() => getQuestions());
};

export const fetchCandidateQuestions = (skills) => {

  return axios.post('/api/question/candidateQuestions', { arrayIdSkills: skills })
    .then(response => {
      return response.data
    }
    );
};

export const fetchSisQuestions = (interviewID) => dispatch => {
  if (interviewID === null) return dispatch(setQuestionsSis([]));

  return axios.get(`/api/answer/getSisAnswers/${interviewID}`)
    .then(questions => dispatch(setQuestionsSis(questions.data)));
};


export const createQuestion = (content, skills, mandatory) => {
  return axios.post('/api/question/create', { content, skills, mandatory }).then(res => res.data)
};

