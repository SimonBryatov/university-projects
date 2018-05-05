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
var schedule = require('node-schedule');
let sm = new require("./handlers/scheduleManager")();
let cm = require("./handlers/configManager");

let clientConfig = jsonfile.readFileSync(file);


let address = `http://127.0.0.1:3000`
socket = io.connect(address);
// sm.newJob();

date = new Date()
//console.log(date.value)
var j = schedule.scheduleJob(date, function(){
  // socket.emit('requestData', { id: clientConfig.id, clientKey: clientConfig.clientKey }) 
});

  socket.on("connect", () => {console.log(`Connected to server ${address} via Socket io`)})
   socket.emit('requestData', { id: clientConfig.id, clientKey: clientConfig.clientKey }) 
    
  socket.on("recieveData", (data, cb) => {
    console.log(chalk.keyword("blue")("============================================================================"))
    console.log("Recieved data. Comparing key hashes...");
    console.log(data[0])
    console.log(SHA384(clientConfig.msgKey).toString())
    if (data[0] !=  SHA384(clientConfig.msgKey).toString()) {
      console.log("Alert!");
      console.log("Key has been compromised/desynchronyzed! Sending SOS message to HQ! We're coming home")
      socket.emit("SOS_lost_key")
    } else {
    let file = JSON.parse(aes.decrypt(data[1].toString('utf-8'), clientConfig.msgKey));
    let newS = new Date(Number(aes.decrypt(data[2], clientConfig.msgKey)));
    console.log(newS.getDate())
    newS = [newS.getFullYear(), newS.getMonth(), newS.getDate(), newS.getHours(), newS.getMinutes(), newS.getSeconds()]
    if (file && newS) {
      console.log(chalk.green("Success!"));
      console.log(chalk.magenta(file));
      console.log(chalk.blue(newS));
      console.log(chalk.keyword("blue")("============================================================================"))
      clientConfig.clientKey = SHA384(clientConfig.clientKey).toString()
      clientConfig.msgKey = SHA384(SHA384(clientConfig.msgKey)).toString()
      clientConfig.schedule = newS
      fs.writeFileSync('./recievedFiles/file.txt', file)
      cm.setConfig(clientConfig);
      sm.newJob();
      cb();
    } 
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
