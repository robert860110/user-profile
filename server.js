var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var middleware = require('./middleware.js');



app.use(middleware.logger);

app.get('/home', middleware.requireAuthentication, function(req, res) {
    res.send('hello express!!');

})

app.use(express.static(__dirname + '/public'));

//console.log(__dirname);

app.listen(PORT, function() {
    console.log('The server has started on port:' + ' ' + PORT);
});
