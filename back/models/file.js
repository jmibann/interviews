const S = require('sequelize');
const db = require('../config/db');

const File = db.define('file', {
    type: { type: S.STRING },
    path: { type: S.STRING },
    size: { type: S.INTEGER },
    filename: { type: S.STRING },
    lastModifiedDate: { type: S.DATE }


}, { timestamps: false });

module.exports = File;