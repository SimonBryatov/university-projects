networkOnline = false;

var schedule = require('node-schedule');
const toggleNetwork = require("./handlers/toggleN.js")

//Init Defininitos
const Express = require("express")
const app = Express();
const server = require('http').createServer(app);  
io = require('socket.io')(server);
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
const moment = require("moment")
const scheduleManager = require("./handlers/scheduleManager")

app.use(cors());

server.listen(3000, () => {console.log("Server is online\nListening on port " + server.address().port)});

app.put('/getFile', require("./routes/getFile"))


io.on('connection', function (socket) {
  socket.on('requestData', function (data) {
    auth(io, data, socket.id, "requestFile", (clientEntry, cb) => {
      let file = fs.readFileSync(clientEntry.filePath).toString();
      let fileBuffer = Buffer.from(aes.encrypt(file, clientEntry.msgKey), 'utf-8');
      let encryptedSchedule = updateSchedule(clientEntry);
      let sendPackage = [SHA384(clientEntry.msgKey).toString(), fileBuffer, encryptedSchedule]
      console.log("Sending file and new schedule to client with id: " + data.id);
      clientEntry.clientKey = SHA384(clientEntry.clientKey).toString()
      clientEntry.msgKey =  SHA384(SHA384(clientEntry.msgKey)).toString()
      updateCilentConfig(data.id, clientEntry)
      socket.emit('recieveData', sendPackage, () => {
        console.log(chalk.magenta('Success send'))
        console.log(chalk.keyword("blue")("============================================================================"))
      })
    })
  });
  socket.on("SOS_lost_key", () => {console.log(`Client ${socket.id} has desynchronized :(`)})
});

date = Date.now()
let sm = new scheduleManager();
sm.init();
// console.log(date)
// date = new Date(date + 4000)
// // io.emit("Error", "Никита молодец")
// console.log(date.getTime())
// var j = schedule.scheduleJob(date, function(){
//   console.log("Job started")
//    io.emit("Error", "Никита молодец")
// });



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
