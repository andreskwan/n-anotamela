var express = require('express');
var path    = require('path');

module.exports = express.static(path.join(__dirname, '../static/'));