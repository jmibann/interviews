import axios from 'axios';
import { SET_SKILL_ARRAY } from '../constants';

const setSkillArray = (skillArray) => ({
    type: SET_SKILL_ARRAY,
    skillArray
});


export const getSkillArray = () => {
    return axios.get('/api/skill/skillStringArray').then(response => response.data);
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

export const saveSkillsFromFile = (skillsArray) => {
    let arrayPromises = [];

    skillsArray.forEach(skill => arrayPromises.push(axios.post('/api/question/create/skills', { skill: skill })))
    return Promise.all(arrayPromises);
};

export const deleteSkill = (deleted) => {
    return axios.post('/api/skill/delete', { deleted })
}
