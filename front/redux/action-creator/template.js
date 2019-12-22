import Axios from 'axios';

import { SET_TEMPLATE } from '../constants';


const setTemplate = (template) => ({ type: SET_TEMPLATE, template });

export const createTemplate = (template) => {
    return (Axios.post('/api/templates/create', template).then(res => res.data));
}

export const fetchTemplates = () => {
    return Axios.get(`/api/templates/all`).then(response => response.data);
}

export const fetchTemplate = (id) => {
    return Axios.get(`/api/templates/template/${id}`).then(result => result.data);
};

export const deleteTemplate = (id) => {
    return Axios.delete(`/api/templates/${id}`)
}

export const editTemplate = (templateId, modifiedTemplate) => {
    return Axios.put(`/api/templates/edit/${templateId}`, modifiedTemplate).then(response => response.data)
}

export const saveTemplate = (obj) => {
    return Axios.post(`/api/templates/newTemplate`, obj).then(res => console.log(res));
}