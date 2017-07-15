require('./helpers/consoleLogHelper.js');

const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/dist', express.static(`${__dirname}/../dist`));

app.get('/', (req, res) => {
  res.end('Test Weather Page');
});

app.listen(process.env.PORT || 8080);

console.info(
  `Listening on ${process.env.ROOT_URL || 'http://localhost'}:${process.env.PORT || 8080}`,
);
