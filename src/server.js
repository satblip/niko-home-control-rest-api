var express = require('express');
var app = express();

var log = require('saga-logger')
  .create({ module: 'server' });

var bodyParser = require('body-parser');

var config = require('config');

app.use(function (req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function (chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function () {
    next();
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var niko = require('niko-home-control');

var responseFormatter = require('./helpers/formatResponses');

niko.init({
  ip: config.niko.homeControl.ip,
  port: config.niko.homeControl.port,
  timeout: config.niko.homeControl.timeout,
  events: true
});

niko.events.on('listactions', (data) => {
  console.log(data, 'actions');
});

niko.events.on('getlive', (data) => {
  console.log(data, 'live');
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

app.get('/actions/:id', function (req, res) {
  var params = req.params;

  niko
    .listActions()
    .then(function (response) {
      res.status(200).send(response.data[params.id].value1.toString());
    })
    .catch(function (error) {
      log.error('bad', error);
      res.status(500).json(responseFormatter.error(error));
    });
});

app.post('/actions/:id', function (req, res) {
  var params = req.params;

  var value = req.rawBody;

  niko
    .executeActions(params.id, parseInt(value, 0))
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
