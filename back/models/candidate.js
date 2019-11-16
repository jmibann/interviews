const S = require('sequelize');
const db = require('../config/db');


const Candidate = db.define('candidate', {
  fullName: { type: S.STRING },
  skypeId: { type: S.STRING },
  email: { type: S.STRING, unique: true, validate: { isEmail: true } },
  telNumber: { type: S.STRING },
  expertise: { type: S.TEXT },
  status: { type: S.STRING }
});

module.exports = Candidate;
