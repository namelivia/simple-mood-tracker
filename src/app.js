var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var sql = require('./db.js');
var config = require('../config/config.js');

app.use(express.json());

app.listen(config.port, config.host, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log('listening on ' + config.host + ':' + config.port);
	}
});

app.route('/moods/today')
	.get(getTodaysMood);

app.route('/moods')
	.get(getAllMoods)
	.post(insertMood);

app.route('/moods/:id')
	.delete(deleteMood);

function getAllMoods(req, res) {
	sql.query('SELECT * FROM moods', function (qErr, qRes) {
		if (qErr) {
			res.status(500);
		} else {
			res.json(qRes);
		}
	});
}
function getTodaysMood(req, res) {
	var date = new Date().toISOString().slice(0, 10);
	sql.query('select * from moods WHERE time = \'' + date + '\';', function (qErr, qRes) {
		if (qErr) {
			res.status(500);
		} else {
			res.json(qRes);
		}
	});
}

function insertMood(req, res) {
	sql.query('INSERT INTO moods (value, time) values (' + req.body.value + ', CURDATE())', function (qErr, qRes) {
		if (qErr) {
			console.log('error: ', qErr);
			res.status(500);
		} else {
			res.status(201).json(qRes.insertId);
		}
	});
}

function deleteMood(req, res) {
	sql.query('DELETE FROM moods WHERE id = ' + req.params.id, function (qErr, qRes) {
		if (qErr) {
			console.log('error: ', qErr);
			res.status(500);
		} else {
			res.status(204).json(qRes.insertId);
		}
	});
}
