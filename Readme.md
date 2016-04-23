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
