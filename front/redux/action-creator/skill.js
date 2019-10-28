import { SET_SKILL_ARRAY } from '../constants';
import axios from 'axios';

const setSkillArray = (skillArray) => ({
    type: SET_SKILL_ARRAY,
    skillArray
});

export const getSkillArray = () => dispatch => {
    axios.get('/api/skill/skillStringArray').then(response => dispatch(setSkillArray(response.data)));
};

export const createSkill = (skill) => {
    return axios.post('/api/skill/create', { skill }).then(response => response.data)
};

export const getAllSkills = () => {
    return axios.get('/api/skill/all').then(response => response.data)
}

export const modifySkill = (id, content) => {
    return axios.post('/api/skill/update', { id, content }).then(response => { return response.data.res })
};

export const saveSkillsFromFile = (skillsArray) => dispatch => {
    let arrayPromises = [];

    skillsArray.forEach(skill => arrayPromises.push(axios.post('/api/question/create/skills', { skill: skill })))
    return Promise.all(arrayPromises);
};
