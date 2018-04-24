networkOnline = false;

var schedule = require('node-schedule');
const toggleNetwork = require("./handlers/toggleN.js")

//Defi
const Express = require("express")
const app = Express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const cors = require("cors");
const fs = require("fs")
const aes = require("./handlers/aes")
const chalk = require("chalk")
const SHA384 = require("crypto-js/sha384");
var bufStr = "fashdfihdsjfhdjofhjfashjf"
var jsonfile = require('jsonfile')
var file = './configs/clients.json'
const updateSchedule = require("./handlers/updateSchedule")
const updateCilentConfig = require("./handlers/updateClientConfig")
const auth = require("./handlers/auth");

// console.log(SHA384("2132").toString())

app.use(cors());

server.listen(3000, () => {console.log("Server is online\nListening on port " + server.address().port)});

app.put('/getFile', require("./routes/getFile"))


io.on('connection', function (socket) {
  socket.on('requestFile', function (data) {
    auth(io, data, socket.id, "requestFile", (clientEntry) => {
      let file = fs.readFileSync(clientEntry.filePath).toString();
      let sendBuffer = Buffer.from(aes.encrypt(file, clientEntry.msgKey), 'utf-8');
      console.log("Sending file to client " + data.id);
      io.to(socket.id).emit('recieveFile', sendBuffer)
    })
  });

  
  socket.on("requestScheduleUpdate", (data) => {
    auth(io, data, socket.id, "requestScheduleUpdate", (clientEntry) => {
      let encryptedSchedule = updateSchedule(clientEntry);
      console.log("Sending new schedule to client " + data.id);
      io.to(socket.id).emit('recieveSchedule', encryptedSchedule)
      clientEntry.clientKey = SHA384(clientEntry.clientKey).toString()
      clientEntry.msgKey = SHA384(clientEntry.msgKey).toString()
      updateCilentConfig(data.id, clientEntry)
    })
  })
  socket.on("SOS_lost_key", () => {console.log(`Client ${socket.id} has desynchronized :(`)})
});


var j = schedule.scheduleJob('*/15 * * * * *', function(){
  // io.emit("Error", "Никита молодец")
});



//   toggleNetwork();
//   setTimeout(() => toggleNetwork(), 1000)



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
