var express = require("express");
var app = express();
var path = require('path');
var port = process.env.PORT || 5000

// // expose node_modules to client app
// app.use(express.static(__dirname + "/node_modules"));
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'src/app')));
// app.get('/', function(req, res) {
//         res.sendfile('./src/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//     });
app.listen(port);
module.exports = app;
