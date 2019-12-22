const S = require('sequelize');
const db = require('../config/db');

const Skill = db.define('skill', {
    skill: {
        type: S.STRING
    }
}, { timestamps: false });

module.exports = Skill;