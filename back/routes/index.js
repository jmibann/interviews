const express = require('express');
const router = express.Router();
const index = require('../models');

const user = require('./user');
const question = require('./question');
const candidate = require('./candidate');
const skill = require('./skill');
const interview = require('./interview');
const answer = require('./answer')

router.use('/user', user);
router.use('/question', question);
router.use('/candidate', candidate);
router.use('/skill', skill);
router.use('/interview', interview);
router.use('/answer', answer);

module.exports = router;