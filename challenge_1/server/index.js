var jsonServer = require('json-server');
var server = jsonServer.create();
// var router = jsonServer.router('./data/db.json');
var path = require('path');
var router = jsonServer.router(path.join(__dirname, '../data/db.json'));

var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3000, function() {
  console.log('JSON Server is running');
});
