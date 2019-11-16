const express = require('express');
const router = express.Router();
const Answers = require('../models/answers');
const Questions = require('../models/questions');
const Interview = require('../models/interview');

router.post('/answersHR', (req, res) => {
  let arrayProm = [];
  const condition = { where: { interviewId: req.body.interviewID } }
  Answers.findOne(condition).then(data => {
    if (data) {
      return res.send(data);
    } else {
      for (let i in req.body) {
        if (i !== 'interviewID' && i !== 'submitted') {
          arrayProm.push(
            Answers.create({ interviewId: Number(req.body.interviewID), questionId: Number(i), observations: req.body[i], answered: true }));
        };
      }
      Promise.all(arrayProm).then(() => res.sendStatus(200)).catch(err => console.log(err));
    }
  });
});

router.post('/postAnswersSIS', (req, res) => {
  let arrayPromis = [];
  let interId = req.body.InterviewSis;

  delete req.body.InterviewSis;

  let answerSis = transformToArray(req.body);

  answerSis.map(answer => {
    arrayPromis.push(Answers.findOne({ where: { interviewId: interId, questionId: answer[0] } }).then(data => {
      answer[1] === 'score' ? arrayPromis.push(data.update({ score: answer[2] })) : arrayPromis.push(data.update({ observations: answer[2] }));
    })
    );
  });

  Promise.all(arrayPromis).then(() => res.sendStatus(200)).catch(e => res.sendStatus({ error: e.errors[0].message }));
});

router.get('/getHRAnswers/:id', (req, res) => {
  let condition = { where: { id: req.params.id }, include: [{ model: Questions, where: { area: 'admin' } }] };

  Interview.findAll(condition).then(data => {
    let arr = [];
    data.forEach(d =>
      d.questions.forEach(q => arr.push({ pregunta: q.content, respuesta: q.answers.observations })))
    res.send(arr);
  });
});

router.get('/getSisAnswers/:id', (req, res) => {
  Answers.findAll({ where: { interviewId: req.params.id, observations: null } }).then(preguntas => {
    let arrayprom = [];
    let arrayPromesas = [];

    preguntas.map(pregunta => arrayPromesas.push(Questions.findByPk(pregunta.questionId)));
    
    Promise.all(arrayPromesas).then(response => {
      response.map(respon => arrayprom.push({ id: respon.id, value: respon.content }));
      res.send(arrayprom);
    });
  });
});

function transformToArray(obj) {
  let array = [];
  let value;

  for (i in obj) {
    let key = i.split('-');
    key[1] === 'score' ? value = [Number(key[0]), key[1], Number(obj[i])] : value = [Number(key[0]), key[1], (obj[i])];
    array.push(value);
  }

  return array;
}

router.get('/getSistAnswers/:id', (req, res) => {
  const questionModel = [{ model: Questions, attributes: ['content'] }];
  const condition = { id: req.params.id };
  const exclude = { exclude: ['id', 'SistObs', 'HRObs', 'sistDate', 'HRDate', 'candidateIDId'] };
  let arrayPares = [];

  Interview.findAll({ where: condition, include: questionModel, attributes: exclude }).then(data => {
    data.forEach(element => element.questions.forEach(answer => {
      if (answer.answers.score)
        arrayPares.push({ score: answer.answers.score, observation: answer.answers.observations, question: answer.content });
    }));
    res.send(arrayPares);
  })
});

router.get('/generalObs/:candID', (req, res) => {
  Interview.findOne({ where: { candidateIDId: req.params.candID } }).then(x => {
    if (x)
      return res.send({ SistObs: x.SistObs, HRObs: x.HRObs });

    return res.send(200);
  });
});

module.exports = router;