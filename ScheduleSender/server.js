networkOnline = false;

var schedule = require('node-schedule');
const toggleNetwork = require("./handlers/toggleN.js")

//Defi
const Express = require("express")
const app = Express();
const server = require('http').createServer(app);  
const io = require('socket.io')(server);
const cors = require("cors");
var bufStr = "fashdfihdsjfhdjofhjfashjf"

app.use(cors());

server.listen(3000, () => {console.log("Server is online\nListening on port " + server.address().port)});

app.put('/getFile', require("./routes/getFile"))

var jsonfile = require('jsonfile')
var file = './clients.json'
const updateSchedule = require("./handlers/updateSchedule")
const auth = require("./handlers/auth");
io.on('connection', function (socket) {
  socket.on('requestFile', function (data) {
    let ledger = jsonfile.readFileSync(file);
    let clientEntry = ledger[data.id]
    if (clientEntry) {
      if (clientEntry.clientKey === data.clientKey) {
      console.log("Authorized client with id: " + data.id);
      let encryptedSchedule = updateSchedule(clientEntry);
      io.to(socket.id).emit('recieveFile', encryptedSchedule) //Buffer.from(bufStr, 'utf8'))
      } else {
        console.log("Declined connection with id: " + data.id);
        io.to(socket.id).emit('Error', "Error! Not Authorized")
      };
    }
  });

  socket.on("requestScheduleUpdate", (data) => {

  })
  socket.on("SOS_lost_key", () => {console.log(`Client ${socket.id} has desynchronized :(`)})
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
