/**
 *
 * Node Server 
 * Core
 *
 */

/* ------------ Require ------------ */

var fs      = require('fs');
var url     = require('url');
var qString = require('querystring');
var routes  = require('routes')();
var view    = require('swig');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var passwordHash = require('password-hash');
var mysql	     = require('mysql');
var connection   = mysql.createConnection({
	host: "127.0.0.1",
	port: 3306,
	database: "db_sipeba",
	user: "root",
	password: "root"
});

/* -------------- Socket ------------ */

var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);

var express = require('express');
var router  = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
	destination: 'public/img/',
	filename: function (req, file, cb) {
        cb(null, file.originalname)
  	}
});
var upload  = multer({ storage: storage })
var path    = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

io.on('connection', function(socket){
	socket.on('newMessage', function(msg){
		io.emit('newMessage', msg);
	});
	socket.on('newBarang', function(name){
		io.emit('newBarang', name);
	});
	socket.on('newPesan', function(pesan, id, idse){
		io.emit('newPesan', pesan, id, idse);
	});
	socket.on('perPesan', function(id, nama, time, me){
		io.emit('perPesan', id, nama, time, me);
	});
	socket.on('newBeli', function(name, barang, id){
		io.emit('newBeli', name, barang, id);
	});
	socket.on('newBeliAdmin', function(name, barang, id){
		io.emit('newBeliAdmin', name, barang, id);
	});
});

function timenow(){
	time  = new Date();
	year  = time.getFullYear();
	month = time.getMonth() + 1;
	date  = time.getDate();
	hour  = time.getHours();
	min   = time.getMinutes();
	sec   = time.getSeconds();
			
	if(month < 10) month = "0"+month;
	if(date  < 10) date  = "0"+date;
	if(hour  < 10) hour  = "0"+hour;
	if(min   < 10) min   = "0"+min;
	if(sec   < 10) sec   = "0"+sec;	

	time = year+"-"+month+"-"+date+" "+hour+":"+min+":"+sec;
}

/* ----------------------- Controller ---------------------- */

require('./controller/loguser')(app, view, connection, passwordHash);
require('./controller/logadmin')(app, view, connection, passwordHash);
require('./controller/user')(app, view, connection, upload, timenow);
require('./controller/admin')(app, view, connection, upload, timenow);
require('./controller/main')(app, view, connection);

http.listen(8080, function(){
	console.log('listening on 8080');
});
