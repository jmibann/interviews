const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const User = require('../models/User');
const Skill = require('../models/skill');
const mailer = require('../mailer/mailer');
const Candidate = require('../models/candidate');
const Interview = require('../models/interview');

router.post('/create', (req, res) => {
  let candidate =req.body;

  Candidate.findOne({ where: { email: candidate.email } }).then(found => {
    if (found) {
      return res.send(false)
    } else {
      let skills =candidate.skills;
      delete (candidate.skills);
      Candidate.create(candidate).then(candidate => candidate.setSkills(skills)).then(data => res.status(201).send(data)).catch(e => res.send({ error: e.errors[0].message }))
    }

  });
});

router.get('/getOne/:id', (req, res) => {
  const userModel = [
    // { model: User, as: 'interviewer1Id', attributes: { exclude: ['password', 'salt'] } },
    // { model: User, as: 'interviewer2Id', attributes: { exclude: ['password', 'salt'] } },
    // { model: User, as: 'interviewer3Id', attributes: { exclude: ['password', 'salt'] } },
    { model: Skill, through: { attributes: [] } }];

  Candidate.findByPk(req.params.id, { include: userModel, attributes: { exclude: ['createdAt', 'updatedAt', 'interviewer1Id', 'interviewer2Id', 'interviewer3Id'] } }).then(candidate => res.send(candidate));
});

router.delete('/:id', (req, res) => {
  Candidate.destroy({ where: { id: req.params.id } }).then(() => res.sendStatus(200));
});

router.put('/edit/:id', (req, res) => {
  let newInfo = req.body;
  let email = newInfo.email;
  let id = req.params.id;

  let skills = newInfo.skills
  delete (newInfo.skills);

  Candidate.findByPk(id).then(candidate => {
    if (email === candidate.email) {
      candidate.update(newInfo).then(updatedCandidate => updatedCandidate.setSkills(skills)).then(data => res.send(true));
    } else {
      Candidate.findOne({ where: { email } }).then(found => {
        if (found) {
          return res.send(false)
        } else {
          candidate.update(newInfo).then(updatedCandidate => updatedCandidate.setSkills(skills)).then(() => res.send(true));
        }
      })
    }

  })
})

router.post('/setUserSIST1', (req, res) => {
  let idCandi = parseInt(req.body.idCandi);
  let idUser = null;

  if (req.body.idUser !== null) idUser = parseInt(req.body.idUser);

  Candidate.findByPk(idCandi).then(candidate => { candidate.setInterSIST1(idUser); }).then(() => res.sendStatus(200));
});

router.post('/setUserSIST2', (req, res) => {
  let idCandi = parseInt(req.body.idCandi);
  let idUser = null;

  if (req.body.idUser !== null) idUser = parseInt(req.body.idUser);

  Candidate.findByPk(idCandi).then(candidate => candidate.setInterSIST2(idUser)).then(candidate => res.send(candidate));
});


router.put('/changeStatus', (req, res) => {
  Candidate.findByPk(req.body.idCandi).then(candidato => candidato.update({ status: req.body.status }).then(() => res.sendStatus(200)))
});

router.get('/getCandidateInterview/:candID', (req, res) => {
  Interview.findOne({ where: { candidateIDId: req.params.candID } }).then(interVW => res.send({ interviewID: interVW.id }));
});

const order = (fullNameSorted) => {
  const FULLNAME_ASCENDENT = [['fullName', 'ASC']];
  const FULLNAME_DESCENDENT = [['fullName', 'DESC']];
  const LAST_MODIFIED = [['updatedAt', 'DESC']];

  let order = LAST_MODIFIED;

  if (typeof fullNameSorted == 'string')
    fullNameSorted === 'true' ? order = FULLNAME_ASCENDENT : order = FULLNAME_DESCENDENT;

  return order
}

const searchParameter = (userID, query) => {
  const parameters = {};
  const keys = Object.keys(query);
  const limit = parseInt(query.pageSize);
  const isAdmin = JSON.parse(query.isAdmin);
  const fullNameSorted = query.fullNameSorted;
  const offset = parseInt(query.page) * parseInt(query.pageSize);

  let fullName = '';
  let statusParam = '%e%';

  let searchCondition = {};
  let skillCondition = {};

  keys.map(key => { parameters[key] = query[key]; });

  if (parameters.status) statusParam = parameters.status;
  if (parameters.fullName) fullName = parameters.fullName;

  if (isAdmin) {
    searchCondition = { status: { [Sequelize.Op.iLike]: statusParam }, [Sequelize.Op.or]: [{ fullName: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }] }
  } else {
    searchCondition = {
      status: { [Sequelize.Op.iLike]: statusParam },
      [Sequelize.Op.and]:
        [
          { [Sequelize.Op.or]: [{ interviewer1Id: userID }, { interviewer2Id: userID }, { interviewer3Id: userID }] },
          { [Sequelize.Op.or]: [{ fullName: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }] }
        ]
    };
  }

  if (parameters.skills) {
    skillCondition = [{ model: Skill, through: { attributes: [] }, where: { skill: { [Sequelize.Op.like]: parameters.skills } } }];
  } else {
    skillCondition = [{ model: Skill, through: { attributes: [] } }];
  }

  condition = { limit, offset, include: skillCondition, where: searchCondition, order: order(fullNameSorted) }
  return condition
}

router.get('/:userID/group', (req, res) => {

  const userID = parseInt(req.params.userID);
  const isAdmin = JSON.parse(req.query.isAdmin);
  const fullNameSorted = req.query.fullNameSorted;
  const myCandidates = (req.query.myCandidates === "true") ? true : false;

  Candidate.findAll(searchParameter(userID, req.query)).then(candidates => {

    let IDs = candidates.map(candidate => candidate.id);

    Candidate.findAll({ include: [{ model: Skill }], where: { id: IDs }, order: order(fullNameSorted) })
      .then(result => result.map(obj => obj.dataValues))
      .then(candidates => isAdmin
        ? candidates.map(candidate =>
          ({ ...candidate, myCandidates: (candidate.interviewer1Id === userID || candidate.interviewer2Id === userID || candidate.interviewer3Id === userID) ? true : false }))
        : candidates
      )
      .then(candidates => (isAdmin && myCandidates) ? candidates.filter(candidate => candidate.myCandidates) : candidates)
      .then(candidates => candidates.map(candidate => ({ ...candidate, skills: candidate.skills.map(skill => skill.skill).sort().join(' - ') })))
      .then(candidates => res.send(candidates));

  })
});

module.exports = router;