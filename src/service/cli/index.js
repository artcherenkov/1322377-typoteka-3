'use strict';

const help = require(`./help.js`);
const generate = require(`./generate.js`);
const version = require(`./version.js`);
const server = require(`./server.js`);

const Cli = {
  [help.name]: help,
  [generate.name]: generate,
  [version.name]: version,
  [server.name]: server
};

module.exports = {
  Cli
};
