const S = require('sequelize');
const db = require('../config/db');

const Questions = db.define('questions', {
  content: { type: S.TEXT, validate: { notEmpty: true } },
  mandatory: { type: S.BOOLEAN },
  active: { type: S.BOOLEAN }
},
  { timestamps: false });

Questions.hooks.add('beforeCreate', (question) => {
  question.active =true;
});

module.exports = Questions;
