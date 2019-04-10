const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/books/:id', express.static(path.join(__dirname, '../public')));

app.use(
  '/books/:id/authors',
  proxy({ target: 'http://localhost:3000', changeOrigin: true })
);

app.use(
  '/books/:id/details',
  proxy({ target: 'http://localhost:3001', changeOrigin: true })
);

module.exports = app;
