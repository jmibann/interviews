var Sequelize = require('sequelize');
require('dotenv').config();

const POSTGRES_USR = process.env.POSTGRES_USR || 'postgres';
const POSTGRES_PWD = process.env.POSTGRES_PWD || 'postgres'
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'interviews-db'
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432'
const POSTGRES_DB = process.env.POSTGRES_DB || 'endavadb'

const connect = 'postgres://' + POSTGRES_HOST + ':' + POSTGRES_PORT + '/' + POSTGRES_DB;
console.log('Interviews connection string: ' + connect);

module.exports = new Sequelize(connect, { logging: false });