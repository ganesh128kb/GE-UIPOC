/*------- NPM ----------*/
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var bodyParser = require('body-parser');
var port = Number(process.env.port || 3000);

var app = express();
/*------- End NPM ----------*/

/*------- View Engine ------*/
app.use('/public', express.static(__dirname + '/public')); // Folder Access
app.set('views', __dirname + '/views');

app.use('/bower_components', express.static(__dirname + '/bower_components')); // Bower Access

app.engine('html', require('ejs').renderFile);

/*------Body parsing----*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/*------Create MiddleWare--------*/
var logDirectory = __dirname + '/log'
    // ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// Create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access-%DATE%.log',
    frequency: 'daily',
    verbose: false
})

// Setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}))
app.use(morgan('combined')); //cmd Logger
/*------End	 MiddleWare--------*


/*------ Page Routing ---------*/
require('./routes/index.js')(app);
/*------ End Page Routing ---------*/

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
