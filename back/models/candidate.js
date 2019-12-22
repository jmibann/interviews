const S = require('sequelize');
const db = require('../config/db');


const Candidate = db.define('candidate', {
    expertise: { type: S.TEXT },
    skypeId: { type: S.STRING },
    fullName: { type: S.STRING },
    telNumber: { type: S.STRING },
    email: { type: S.STRING, unique: true, validate: { isEmail: true } },
    status: {
        type: S.TEXT,
        set(status) { this.setDataValue('status', status) },
        get() { return this.getDataValue('status') }
    }
});

module.exports = Candidate;