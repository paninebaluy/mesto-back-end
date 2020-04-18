const supertest = require('supertest');
const app = require('./app.js');

const request = supertest(app);
