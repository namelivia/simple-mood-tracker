'use strict';
var mysql = require('mysql');
var config = require('../config/config.js');
var	connection = mysql.createConnection(config.database);

connection.connect(function (err) {
	if (err) {
		throw err;
	}
});

module.exports = connection;
