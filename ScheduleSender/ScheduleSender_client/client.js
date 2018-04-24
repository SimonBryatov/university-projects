var http = require('http');
var fs = require('fs');
const axios = require("axios")
var jsonfile = require('jsonfile')
var file = './clientConfig.json'
var CryptoJS = require("crypto-js");
var io = require('socket.io-client');
const chalk = require("chalk")
const aes = require("./handlers/aes")
const SHA384 = require("crypto-js/sha384");

// let f = jsonfile.readFileSync("./clientConfig.json");
// f.schedule = 324234234
//jsonfile.writeFileSync("./clientConfig.json", f, {spaces: 2, EOL: '\r\n'})

let clientConfig = jsonfile.readFileSync(file);

// let config =  {
//     method: 'put',
//     url: 'http://127.0.0.1:3000/getFile',
//     params: {
//       id: request.id,
//       clientKey: request.clientKey
//     }
//   }

// var file = fs.createWriteStream("file.txt");
// axios(config).then((resp) => {
//   console.log("Got " + resp.data)
//   var bytes  = CryptoJS.AES.decrypt(resp.data.toString(), "123");
//   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   console.log(decryptedData)
// }).catch((err) => console.log(err.message));
let address = `http://127.0.0.1:3000`
var socket = io.connect(address);

  socket.on("connect", () => {console.log(`Connected to server ${address} via Socket io`)})
  socket.emit('requestFile', { id: clientConfig.id, clientKey: clientConfig.clientKey }) 
    
  socket.on("recieveFile", (data) => {
    console.log("Recieved file. Trying to decrypt...");
    let file = JSON.parse(aes.decrypt(data.toString('utf-8'), clientConfig.msgKey));
    if (file) {
      console.log(chalk.green("Success!"));
      console.log(chalk.magenta(file));
      fs.writeFileSync('./recievedFiles/file.txt', file)
      socket.emit("requestScheduleUpdate",  { id: clientConfig.id, clientKey: clientConfig.clientKey })
    } else {
      console.log("Fail.");
      console.log("Key is desynchronized! Sending SOS! We're coming home")
      socket.emit("SOS_lost_key")
    }
  })

  socket.on("recieveSchedule", (data) => {
    console.log("Recieved schedule. Trying to decrypt...");
    let scheduleString = aes.decrypt(data, clientConfig.msgKey)
    if (scheduleString) {
    console.log(chalk.green("Success!"));
    console.log(chalk.magenta(scheduleString));
    clientConfig.clientKey = SHA384(clientConfig.clientKey).toString()
    clientConfig.msgKey = SHA384(clientConfig.msgKey).toString()
    jsonfile.writeFileSync("./clientConfig.json", clientConfig, {spaces: 2, EOL: '\r\n'})
    } else {
      console.log("Fail.");
      console.log("Key is desynchronized! Sending SOS! We're coming home")
      socket.emit("SOS_lost_key")
    }
  })

  socket.on("Error", (msg) => {
    console.log(msg);
  })

// fs.writeFile('file.txt', file, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });


  // (data) => {
  //   if (data.error) {
  //     console.log(data.error)
  //   } else {
  //     let scheduleString = aes.decrypt(data, clientConfig.msgKey)
  //     if (scheduleString) {
  //     console.log(scheduleString);
  //     } else {
  //       console.log("Key is desynchronized! Sending SOS! We're coming home")
  //       socket.emit("SOS_lost_key")
  //     }
  //   }
  // });

  //console.log(socket)
