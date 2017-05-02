[![](https://imagelayers.io/badge/satblip/niko-home-control-rest-api:latest.svg)](https://imagelayers.io/?images=satblip/niko-home-control-rest-api:latest 'Get your own badge on imagelayers.io') [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard) [![bitHound Code](https://www.bithound.io/github/satblip/niko-home-control-rest-api/badges/code.svg)](https://www.bithound.io/github/satblip/niko-home-control-rest-api)


# Rest API based on NIKO Home Control NPM Module

[NPM Module](https://github.com/satblip/niko-home-control)

## Init

You gonna need a config file name `<NODE_ENV value>.json` that is located in `./config`

```json
{
  "niko": {
    "homeControl": {
      "ip": "xxx.xxx.xxx.xxx",
      "port": 8000,
      "timeout": 5000
    }
  }
}

```

## Run

YOu can run the server with [Docker-compose](https://docs.docker.com/compose/) with this one line command:

`docker-compose up`

## Usage

`GET /`

Returns a `HTTP 200` if the app is up, used for healtcheking


`GET /status`

Returns the system info from the Home control installation


`GET /energy`

Returns the energy consumptions if you have the meter module in your installation


`GET /actions`

Returns the liste of available actions


`POST /actions/:id/:value`

Post a value on a specific action

And, for the demo, in the console, you'll receive live status from the controller
