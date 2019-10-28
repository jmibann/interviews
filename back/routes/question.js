const express = require('express');
const Questions = require('../models/questions');
const Skill = require('../models/skill');
const router = express.Router();

router.get('/delete/:id', (req, res) => {
  Questions.findByPk(req.params.id).then(question => question.destroy().then(() => res.sendStatus(200)));
});

router.get('/reqAllQuestions', (req, res) => {
  const skillModel = [{ model: Skill, through: { attributes: [] } }];

  Questions.findAll({ include: skillModel }).then(questionArray => res.send(questionArray));
});

router.get('/sizeOfAllSistQuestions', (req, res) => {
  const skillModel = [{ model: Skill, through: { attributes: [] } }];

  Questions.findAll({ include: skillModel }).then(questionArray => res.send({ length: questionArray.length }));
});

router.post('/edit/:id', (req, res) => Questions.findByPk(req.params.id).then(question => question.update({ content: req.body.content }).then(updatedQuestion => res.send(updatedQuestion))));

router.post('/create', (req, res) => {
  const condition = { content: req.body.content };

  Questions.findOrCreate({ where: condition }).then(([question, created]) => {
    if (created) {
      question.update({mandatory: req.body.mandatory})
      question.setSkills(req.body.skills);
      return res.sendStatus(200);
    }
    res.sendStatus(500);
  })
    .catch(() => res.sendStatus(500));
});

router.post('/bulkCreate', (req, res, next) => {
  const questionsArray = req.body;
  const str2IdTranslator = {};
  const promiseArray = [];

  Skill.findAll().then(skills => {
    skills.map(skill => str2IdTranslator[skill.skill] = skill.id);

    questionsArray.forEach(question => {
      let skillArray = question.skills.map( skillString => (str2IdTranslator[skillString]));
      delete question.skills;

      Questions.create(question).then(createdQuestion => promiseArray.push(createdQuestion.setSkills(skillArray)))
    });
    Promise.all(promiseArray).then(() => res.sendStatus(200));
  })
});

router.get('/searchHRQuestions', (req, res) => {
  Questions.findAll({ where: { area: 'admin' } }).then(area => res.send(area));
});

router.post('/create/skills', (req, res) => {
  Skill.findOrCreate({ where: req.body }).then(([skill, created]) => res.send(200));
});

router.post('/candidateQuestions', (req, res) => {
  const idSkillArray = req.body.arrayIdSkills;
  const promisesArr = [];

  idSkillArray.forEach(id => promisesArr.push(Questions.findAll({ include: [{ model: Skill, where: { id: id } }] })));

  Promise.all(promisesArr).then(questionsArray => {
    let idToFetchArray = [];
    questionsArray.forEach(questions => questions.forEach(question => idToFetchArray.push(question.id)));
    idToFetchArray = idToFetchArray.filter((item, index) => idToFetchArray.indexOf(item) === index);
    Questions.findAll({ where: { id: idToFetchArray }, attributes: ['id', 'content'] }).then(questions => res.send(questions))
  });
});

module.exports = router;
