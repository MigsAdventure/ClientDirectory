//  CONSTANTS
// const PORT = process.env.PORT || 8000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/PropertyManager';

//  PACKAGE REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const mongoose = require('mongoose');
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URI = config.db[NODE_ENV];

mongoose.Promise = Promise;
mongoose.connect(DB_URI, (err) => {
  console.log(err || `MongoDB connected to ${DB_URI}`);
});


//  APP DECLARATION
const app = express();
// const server = http.createServer(app);

//  WEBPACK CONFIG
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

//  GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//  ROUTES
app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  res.sendFile(indexPath);
});
// //  SERVER LISTEN
// server.listen(PORT, (err) => {
//   if (err) throw err;
//   console.log(`Server listening at http://localhost:${PORT}`);
// });
module.exports = app;
