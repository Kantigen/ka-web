FROM node:5.12.0

RUN echo "1.12";

COPY ${PWD}/Gulpfile.js /src/Gulpfile.js
COPY ${PWD}/package.json /src/package.json

WORKDIR /src

RUN npm update
RUN npm install -g gulp
RUN npm install

RUN mkdir -p /src/build
