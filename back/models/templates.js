const S = require('sequelize');
const db = require('../config/db');

const Template = db.define('template', {
  name: { type: S.STRING, unique: true },
  user: { type: S.STRING },
  date: { type: S.DATE },

});

module.exports = Template;