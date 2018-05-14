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
const SHA384 = require("crypto-js/sha384")
chalk = require("chalk")
var bufStr = "fashdfihdsjfhdjofhjfashjf"
var jsonfile = require('jsonfile')
var file = './configs/clients.json'
const updateSchedule = require("./handlers/updateSchedule")
const updateCilentConfig = require("./handlers/updateClientConfig")
const auth = require("./handlers/auth");
const moment = require("moment")
const scheduleManager = require("./handlers/scheduleManager")
const cm = require("./handlers/clientManager")

app.use(cors());

server.listen(3000, () => {console.log("Server is online\nListening on port " + server.address().port)});

app.put('/getFile', require("./routes/getFile"))

console.log(new Date(...cm.getClientConfig("1234_submarine").schedule).getTime())

io.on('connection', function (socket) {
  socket.on('requestData', function (data) {
    auth(io, data, socket.id, "requestFile", (clientConfig, cb) => {
      let msgKey = clientConfig.msgKey;
      clientConfig.clientKey = SHA384(clientConfig.clientKey).toString()
      clientConfig.msgKey =  SHA384(SHA384(clientConfig.msgKey)).toString()
      cm.setClientConfig(data.id, clientConfig);
      let file = fs.readFileSync(clientConfig.filePath).toString();
      let fileBuffer = Buffer.from(aes.encrypt(file, msgKey), 'utf-8');
      let encryptedSchedule = aes.encrypt(new Date(...cm.getClientConfig(data.id).schedule).getTime(), msgKey)
      let sendPackage = [SHA384(msgKey).toString(), fileBuffer, encryptedSchedule]
      console.log("Sending file and new schedule to client with id: " + data.id);
        socket.emit('recieveData', sendPackage, () => {
        console.log(chalk.green('Success send'))
        console.log(chalk.keyword("blue")("============================================================================ \n"))
      })
    })
  });
  socket.on("SOS_lost_key", () => {console.log(`Client ${socket.id} has desynchronized :(`)})
  socket.on("Hello", () => {console.log("Hello")})
});

date = Date.now()
let sm = new scheduleManager();
sm.init();
