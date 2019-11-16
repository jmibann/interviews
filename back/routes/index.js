const express = require('express');
const router = express.Router();

const index = require('../models');

const file = require('./file');
const user = require('./user');
const skill = require('./skill');
const answer = require('./answer');
const question = require('./question');
const interview = require('./interview');
const candidate = require('./candidate');

router.use('/user', user);
router.use('/file', file);
router.use('/skill', skill);
router.use('/answer', answer);
router.use('/question', question);
router.use('/interview', interview);
router.use('/candidate', candidate);

module.exports = router;