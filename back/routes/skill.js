const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

router.post('/create', function (req, res) {
  const condition = { where: { skill: req.body.skill } };

  Skill.findAll(condition).then(foundSkills => {
    if (foundSkills.length) {
      return res.send(false)
    };
    Skill.create({ skill: req.body.skill }).then(() => { res.send(true) });
  })
})


router.get('/all', (req, res) => {
  Skill.findAll().then(skills => res.send(skills));
});

router.post('/delete', function (req, res) {
  let condition = { where: { id: req.body.deleted } };

  Skill.destroy(condition).then(() => res.sendStatus(202));
});

router.get('/skillStringArray', function (req, res) {
  Skill.findAll().then(skills => res.send(skills.map(skill => skill.skill)));
});

router.post('/update', function (req, res) {
  const { id, content } = req.body;
  Skill.findAll({ where: { skill: content } }).then(result => {
    if (result.length) {
      return res.send({ res: false })
    }
    Skill.findByPk(id).then(skill => skill.update({ skill: content }).then(() => { return res.send({ res: true }) }))
  })

})

module.exports = router;
