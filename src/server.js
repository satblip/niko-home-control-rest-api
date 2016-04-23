var express = require('express');
var app = express();

var log = require('saga-logger')
  .create({ module: 'server' });

var bodyParser = require('body-parser');

var config = require('config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var niko = require('niko-home-control');

var responseFormatter = require('./helpers/formatResponses');

niko.init({
  ip: config.niko.homeControl.ip,
  port: config.niko.homeControl.port,
  timeout: config.niko.homeControl.timeout
});

app.get('/', function (req, res) {
  res.status(200).json({
    app: 'Niko-Home-Control'
  });
});

app.get('/status', function (req, res) {
  niko
    .systemInfo()
    .then(function (response) {
      res.status(200).json(responseFormatter.success(response));
    })
    .catch(function (error) {
      res.status(500).json(responseFormatter.error(error));
    });
});

app.get('/actions', function (req, res) {
  niko
    .listActions()
    .then(function (response) {
      res.status(200).json(responseFormatter.success(response));
    })
    .catch(function (error) {
      res.status(500).json(responseFormatter.error(error));
    });
});

app.post('/actions/:id/:value', function (req, res) {
  var params = req.params;

  niko
    .executeActions(params.id, params.value)
    .then(function (response) {
      res.status(200).json(responseFormatter.success(response));
    })
    .catch(function (error) {
      res.status(500).json(responseFormatter.error(error));
    });
});

app.get('/energy', function (req, res) {
  niko
    .listEnergy()
    .then(function (response) {
      res.status(200).json(responseFormatter.success(response));
    })
    .catch(function (error) {
      res.status(500).json(responseFormatter.error(error));
    });
});

app.listen(config.httpPort, function () {
  log.info('server-started', { port: config.httpPort });
});
