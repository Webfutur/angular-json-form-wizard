var express = require('express');
var fs      = require('fs');

var app = express();

app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use('/demo', express.static(__dirname));

var data = fs.readFileSync(__dirname + '/index.html', 'utf-8');
app.get('/', function(req, res) {
    res.end(data);
});

app.listen(8080);
