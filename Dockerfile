FROM mhart/alpine-node:5.11.0

EXPOSE 3000
ENV APP_NAME niko_home_control_rest_api

ADD ./src /var/www/src
ADD ./config /var/www/config
ADD ./index.js /var/www/index.js
ADD ./package.json /var/www/package.json

WORKDIR /var/www

RUN npm install

CMD ["npm", "start"]
