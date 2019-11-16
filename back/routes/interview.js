const express = require('express');
const Interview = require('../models/interview');
const Candidate = require('../models/candidate');
const router = express.Router();

router.post('/newInterview', (req, res) => {
  const condition = { where: { candidateIDId: req.body.candidateId } };

  Interview.findOrCreate(condition).then(([interview, created]) => {
    if (created) {
      interview.setCandidateID(req.body.candidateId);
      Candidate.findByPk(req.body.candidateId).then((candidate) => candidate.setInterviewID(interview.id));
    }
    res.send(interview);
  });
});

router.get('/getInterview/:id', (req, res) => {
  Interview.findOne({ where: { candidateIDId: req.params.id } }).then(data => res.send(data));
});

router.post('/candidateInt', (req, res) => {
  const  questionsID = req.body.questionsID;
  const condition = { where: { candidateIDId:  req.body.candidateID } };

  Interview.findOne(condition).then(interview => interview.addQuestion(questionsID, { through: 'Answer' }));
  res.send(200);
});

router.get('/:id', (req, res) => {
  Interview.findByPk(req.params.id).then(interview => res.send(interview));
});

module.exports = router;
