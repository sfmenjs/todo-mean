var express = require('express'); 
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

require('./models/ToDo');
mongoose.connect('mongodb://localhost/todolist');

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile); //lets express render the html pages
app.use(express.static(__dirname + '/public')); //lets us link our stylesheets/scripts to our index page
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//used for the Restful api
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//middleware that runs before all routes. Logs the method and the url of the request
app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.get('/', function(req, res) {
	res.render('index');
});

var toDoRoutes = require('./routes/ToDo')
app.use('/api/v2/ToDo', toDoRoutes);

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://localhost:' + port);
});