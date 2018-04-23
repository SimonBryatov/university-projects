networkOnline = false;

var schedule = require('node-schedule');
const toggleNetwork = require("./handlers/toggleN.js")

//Defi
const Express = require("express")
const app = Express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const cors = require("cors");


app.use(cors());

server.listen(3000, () => {console.log("Server is online\nListening on port " + server.address().port)});

app.put('/getFile', require("./routes/getFile"))

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});










// var j = schedule.scheduleJob('*/5 * * * * *', function(){
//   toggleNetwork();
//   setTimeout(() => toggleNetwork(), 1000)
// });
// toggleNetwork();

// const Koa = require('koa');
//var Router = require('koa-router');
//var cors = require('koa2-cors');
//const send = require('koa-send');
// var enforceHttps = require('koa-sslify');
// const router = new Router();
// app
//   .use(router.routes())
//   .use(router.allowedMethods());
