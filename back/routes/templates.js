const express = require('express');
const router = express.Router();

const Template = require('../models/templates');
const Questions = require('../models/questions');
const Skill = require('../models/skill');
const User = require('../models/User');


//function for comparing arrays length for questions duplication
const compareArrays = (array, questions) => {
        let isEqual = true;
        array.forEach(arr => {
            if (questions.indexOf(arr.dataValues.id.toString()) < 0) {
                isEqual = false;
            }
        })
        return isEqual;
    }
    //creation of template
router.post('/create', (req, res) => {
    let createTemplate = req.body;
    let id = normalizeIdParam(createTemplate.id);
    let name = createTemplate.name;
    let skills = createTemplate.skills;
    let questions = createTemplate.questions;
    let condition = { include: [{ model: Skill }, { model: Questions }] }

    Template.findAll(condition).then(templates => {
        const nameExists = templates.some(t => t.id !== id && t.name.toLowerCase() === name.toLowerCase());
        if (!nameExists) {
            const sameQuestions = templates.filter(t => t.id !== id && t.questions.length === questions.length && compareArrays(t.questions, questions));
            if (sameQuestions.length === 0) {
                delete(createTemplate.questions);
                delete(createTemplate.skills);
                Template.create(createTemplate)
                    .then(template => { template.setSkills(skills); return template })
                    .then(template => template.setQuestions(questions))
                    .then(data => res.status(200).send(data))
                    .catch(e => res.send({ error: e.errors[0].message }));
            } else {
                res.status(400);
                return res.send('the same set of questions already exists in another template');
            }
        } else {
            res.status(400);
            return res.send('there is already a template named ' + name);
        }
    })
});

//get all templates for grid
router.get('/all', (req, res) => {
    Template.findAll({ include: [{ model: Skill }, { model: Questions }] }).then(templates => res.send(templates));
});

//get one individual template by ID
router.get('/template/:id', (req, res) => {
    Template.findByPk(req.params.id, { include: [{ model: Skill }, { model: Questions }] }).then(template => res.send(template));
});

//delete individual template by ID
router.delete('/:id', (req, res) => {
    Template.destroy({ where: { id: req.params.id } }).then(() => res.sendStatus(200));
});

const normalizeIdParam = (value) => {
    if (value) {
        return parseInt(value)
    }
    return 0;
}

//edit templates
router.put('/edit/:id', (req, res) => {
    let id = normalizeIdParam(req.params.id);
    let newInfo = req.body;
    let name = newInfo.name;
    let skills = newInfo.skills;
    let questions = newInfo.questions;
    let condition = { include: [{ model: Skill }, { model: Questions }] }

    delete(newInfo.skills);
    delete(newInfo.questions);

    Template.findAll(condition).then(templates => {
        const nameExists = templates.some(t => t.id !== id && t.name.toLowerCase() === name.toLowerCase());
        if (!nameExists) {
            const sameQuestions = templates.filter(t => t.id !== id && t.questions.length === questions.length && compareArrays(t.questions, questions));
            if (sameQuestions.length === 0) {
                const currentTemplate = templates.filter(t => t.id === id)[0];
                currentTemplate.update(newInfo, { where: { id: id } })
                    .then(updatedTemplate => { updatedTemplate.setSkills(skills); return updatedTemplate })
                    .then(updatedTemplate => updatedTemplate.setQuestions(questions))
                    .then(data => res.send(true))
                    .catch(e => console.log(e));

            } else {
                res.status(400);
                return res.send('the same set of questions already exists in another template');
            }
        } else {
            res.status(400);
            return res.send('there is already a template named' + name);
        }
    })
})

module.exports = router;