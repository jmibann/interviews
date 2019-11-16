import Axios from 'axios';
import { SET_ANSWERSHR, SET_ANSWERS_SIST, SET_OBS } from '../constants';

const setAnswersHR = (answersHR) => ({ type: SET_ANSWERSHR, answersHR });
const setAnswersSIST = (answersSIST) => ({ type: SET_ANSWERS_SIST, answersSIST });
const setObservations = (observations) => ({ type: SET_OBS, observations });

export const submitHRAnswers = (answersHR) =>
  dispatch => Axios.post('/api/answer/answersHR', answersHR).then((response) => 'guardado');

export const fetchHrAnswers = (interviewID) =>
  dispatch => Axios.get(`/api/answer/getHRAnswers/${interviewID}`).then(answers => dispatch(setAnswersHR(answers.data)));

export const answerSystems = (answersSis) =>
  dispatch => Axios.post('/api/answer/postAnswersSIS', answersSis).then(res => res.data).then(response => {
    if (response.error) return response.error;
    return '200';
  });

export const fetchSistAnswers = (interviewID) =>
  dispatch => Axios.get(`/api/answer/getSistAnswers/${interviewID}`).then(answers => dispatch(setAnswersSIST(answers.data)));

export const fetchGeneralObs = (interviewID) =>
  dispatch => Axios.get(`/api/answer/generalObs/${interviewID}`).then(obs => dispatch(setObservations(obs.data)));
