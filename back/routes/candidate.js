const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize'); 

const Candidate = require('../models/candidate');
const User = require('../models/User');
const Skill = require('../models/skill');
const Interview = require('../models/interview');
const mailer = require('../mailer/mailer');

router.post('/create', (req, res) => {
  let candidateData = { ...req.body.candidate };
  let selectedSkills = req.body.candidate.selectedSkills;
  let arrId = [];

  selectedSkills.map((obj) => arrId.push(obj.id));
  delete(candidateData.selectedSkills);

  Candidate.create(candidateData).then(candidate => candidate.setSkills(arrId)).then(data => res.status(201).send(data)).catch(e => {
    res.send({ error: e.errors[0].message })
  }
    );
});

router.get('/getAll', (req, res) => {
  const skillModel = [{ model: Skill, through: { attributes: [] } }];

  Candidate.findAll({ include: skillModel }).then(candidates => res.send(candidates));
});

router.get('/sizeOfAllCandidatesList', (req, res) => {
  Candidate.findAll().then(candidates => res.send({ length: candidates.length }));
});

router.get('/sizeOfMyCandidatesList/:userId', (req, res) => {
  const skillModel = [{ model: Skill, through: { attributes: [] } }];
  const condition = { [Sequelize.Op.or]: [{ interviewerHRId: req.params.userId }, { interSIST1Id: req.params.userId }, { interSIST2Id: req.params.userId }] };

  Candidate.findAll({ include: skillModel, where: condition }).then(candidates => res.send({ length: candidates.length }));
});

router.get('/RRHH/sizeOfGroup', (req, res) => {
  const parameters = {};
  const keys = Object.keys(req.query);
  const ascendent = [['surname', 'ASC'], ['name', 'ASC']];
  const descendent = [['surname', 'DESC'], ['name', 'DESC']];

  let whereSkillParam = {};
  let fullName = '';
  let statusParam = '%e%';
  let ascDescArrayParam = [];

  keys.map(key => parameters[key] = req.query[key]);


  if (parameters.status) statusParam = parameters.status;
  if (parameters.fullName) fullName = parameters.fullName;
  if (parameters.skills) whereSkillParam.skill = parameters.skills;
  if (parameters.fullNameSorted === 'true' || parameters.fullNameSorted === 'false') {
    parameters.fullNameSorted === 'true' ? ascDescArrayParam = ascendent : ascDescArrayParam = descendent;
  }

  let condition = {
    status: { [Sequelize.Op.iLike]: statusParam },
    [Sequelize.Op.or]: [{ surname: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }, { name: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }]
  }

  Candidate.findAll({ include: [{ model: Skill, through: { attributes: [] }, where: whereSkillParam }], where: condition, order: ascDescArrayParam }).then(candidates => res.send({ size: candidates.length }));
});

router.get('/RRHH/group', (req, res) => {
  const parameters = {};
  const keys = Object.keys(req.query);
  const limit = parseInt(req.query.pageSize);
  const ascendent = [['surname', 'ASC'], ['name', 'ASC']];
  const descendent = [['surname', 'DESC'], ['name', 'DESC']];
  const skillModel = [{ model: Skill, through: { attributes: [] } }];
  const offset = parseInt(req.query.page) * parseInt(req.query.pageSize);

  let fullName = '';
  let statusParam = '%e%';
  let ascDescArrayParam = [['updatedAt', 'DESC']];

  keys.map(key => { parameters[key] = req.query[key]; });

  if (parameters.status) statusParam = parameters.status;
  if (parameters.fullName) fullName = parameters.fullName;
  if (parameters.fullNameSorted === 'true' || parameters.fullNameSorted === 'false')
    parameters.fullNameSorted === 'true' ? ascDescArrayParam = ascendent : ascDescArrayParam = descendent;

  const condition = {
    status: { [Sequelize.Op.iLike]: statusParam },
    [Sequelize.Op.or]: [{ surname: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }, { name: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }]
  }

  if (parameters.skills) {
    const skillModelFiltered = [{ model: Skill, through: { attributes: [] }, where: { skill: { [Sequelize.Op.like]: parameters.skills } } }];
    Candidate.findAll({ limit, offset, include: skillModelFiltered, where: condition, order: ascDescArrayParam }).then(skilledCandidates => {
      let IDarray = skilledCandidates.map(candidate => candidate.id);
      Candidate.findAll({ include: skillModel, where: { id: IDarray }, order: ascDescArrayParam }).then(candidates => res.send(candidates));
    });
  } else {
    Candidate.findAll({ limit, offset, include: skillModel, where: condition, order: ascDescArrayParam }).then(candidates => res.send(candidates))
  }
});

router.get('/sist/:userID/group', (req, res) => {
  const parameters = {};
  const keys = Object.keys(req.query);
  const limit = parseInt(req.query.pageSize);
  const userID = parseInt(req.params.userID);
  const ascendent = [['surname', 'ASC'], ['name', 'ASC']];
  const descendent = [['surname', 'DESC'], ['name', 'DESC']];
  const skillModel = [{ model: Skill, through: { attributes: [] } }];
  const offset = parseInt(req.query.page) * parseInt(req.query.pageSize);

  let fullName = '';
  let statusParam = '%e%';
  let ascDescParam = [['updatedAt', 'DESC']];

  keys.map(key => { parameters[key] = req.query[key]; });

  if (parameters.status) statusParam = parameters.status;
  if (parameters.fullName) fullName = parameters.fullName;
  if (parameters.fullNameSorted === 'true' || parameters.fullNameSorted === 'false')
    parameters.fullNameSorted === 'true' ? ascDescParam = ascendent : ascDescParam = descendent;

  const condition = {
    status: { [Sequelize.Op.iLike]: statusParam },
    [Sequelize.Op.and]: [
      { [Sequelize.Op.or]: [{ interviewerHRId: userID }, { interSIST1Id: userID }, { interSIST2Id: userID }] },
      { [Sequelize.Op.or]: [{ surname: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }, { name: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }] }
    ]
  };

  if (parameters.skills) {
    const skillModelFiltered = [{ model: Skill, through: { attributes: [] }, where: { skill: parameters.skills } }];

    Candidate.findAll({ limit, offset, include: skillModelFiltered, where: condition, order: ascDescParam }).then(skilledCandidates => {
      let IDarray = [];
      for (let i = 0; i < skilledCandidates.length; i += 1) IDarray.push(skilledCandidates[i].id);

      Candidate.findAll({ include: skillModel, where: { id: IDarray }, order: ascDescParam }).then(candidates => res.send(candidates));
    });
  } else {
    Candidate.findAll({ limit, offset, include: skillModel, where: condition, order: ascDescParam }).then(candidates => res.send(candidates));
  }
});

router.get('/sist/:userID/sizeOfGroup', (req, res) => {
  const parameters = {};
  const keys = Object.keys(req.query);
  const userID = parseInt(req.params.userID);
  const ascendent = [['surname', 'ASC'], ['name', 'ASC']];
  const descendent = [['surname', 'DESC'], ['name', 'DESC']];
  
  let fullName = '';
  let whereSkillParam = {};
  let statusParam = '%e%';
  let ascDescArrayParam = [];

  keys.map(key => { parameters[key] = req.query[key]; });

  if (parameters.status) statusParam = parameters.status;
  if (parameters.fullName) fullName = parameters.fullName;
  if (parameters.skills) whereSkillParam.skill = parameters.skills;
  if (parameters.fullNameSorted === 'true' || parameters.fullNameSorted === 'false')
    parameters.fullNameSorted === 'true' ? ascDescArrayParam = ascendent : ascDescArrayParam = descendent;

  const skillModelFiltered = [{ model: Skill, through: { attributes: [] }, where: whereSkillParam }];
  const condition = {
    status: { [Sequelize.Op.iLike]: statusParam },
    [Sequelize.Op.or]: [{ surname: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }, { name: { [Sequelize.Op.iLike]: '%' + fullName + '%' } }],
    [Sequelize.Op.or]: [{ interviewerHRId: userID }, { interSIST1Id: userID }, { interSIST2Id: userID }]
  };

  Candidate.findAll({ include: skillModelFiltered, where: condition, attributes: ['id'], order: ascDescArrayParam }).then(candidates => res.send({ size: candidates.length }));
});

router.get('/getOne/:id', (req, res) => {
  const userModel = [
    { model: User, as: 'interviewerHR', attributes: { exclude: ['password', 'salt'] } },
    { model: User, as: 'interSIST1', attributes: { exclude: ['password', 'salt'] } },
    { model: User, as: 'interSIST2', attributes: { exclude: ['password', 'salt'] } },
    { model: Skill, through: { attributes: [] } }];

  Candidate.findByPk(req.params.id, { include: userModel }).then(candidate => res.send(candidate));
});

router.delete('/delete/:id', (req, res) => {
  Candidate.destroy({ where: { id: req.params.id } }).then(() => res.sendStatus(200));
});

router.get('/getMyCandidates/:userId', (req, res) => {
  const userId = req.params.userId;

  if (userId) {
    const skillModel = [{ model: Skill, through: { attributes: [] } }];
    const condition = { [Sequelize.Op.or]: [{ interviewerHRId: userId }, { interSIST1Id: userId }, { interSIST2Id: userId }] };

    Candidate.findAll({ include: skillModel, where: condition }).then(candidates => res.send(candidates));
  } else {
    res.sendStatus(200);
  }
});

// router.post('/setUserHR', (req, res) => {
//   Candidate.findByPk(req.body.idCandi).then(candidate => candidate.setInterviewerHR(req.body.idUser)).then(() => res.sendStatus(200));
// });

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

router.post('/export', (req, res) => {
  mailer('candidate', {
    data: req.body.data,
    content: {
      candidate: {
        name: req.body.content.candidate.name,
        surname: req.body.content.candidate.surname,
        email: req.body.content.candidate.email,
        telephone: req.body.content.candidate.telNumber,
        expertise: req.body.content.candidate.expertise
      },
      HHRR: req.body.content.HHRR,
      SYS: req.body.content.SYS
    }
  });
});

module.exports = router;