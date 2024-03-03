// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is CORS-enabled for all origins!' });
});

module.exports.handler = serverless(app);
