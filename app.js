var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var sql = require('./db.js');
var config = require('./config.js');

app.use(express.json());

app.listen(config.port, config.host, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log('listening on ' + config.host + ':' + config.port);
	}
});

app.route('/moods')
	.get(getAllMoods)
	.post(insertMood)

function getAllMoods(req, res) {
	sql.query('SELECT * FROM moods', function (qErr, qRes) {
		if (qErr) {
			console.log('error: ', qErr);
		} else {
			res.json(qRes);
		}
	});
}

function insertMood(req, res) {
	sql.query('INSERT INTO moods (value, time) values (' + req.body.value + ', CURDATE())', function (qErr, qRes) {
		if (qErr) {
			console.log('error: ', qErr);
		} else {
			console.log(qRes.insertId);
			res.status(201).json(qRes.insertId);
		}
	});
}
