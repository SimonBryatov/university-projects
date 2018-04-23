var http = require('http');
var fs = require('fs');
const axios = require("axios")
var jsonfile = require('jsonfile')
var file = './clientConfig.json'
var CryptoJS = require("crypto-js");
var io = require('socket.io-client')
 
let request = jsonfile.readFileSync(file);

let config =  {
    method: 'put',
    url: 'http://127.0.0.1:3000/getFile',
    params: {
      id: request.id,
      clientKey: request.clientKey
    }
  }

// var file = fs.createWriteStream("file.txt");
// axios(config).then((resp) => {
//   console.log("Got " + resp.data)
//   var bytes  = CryptoJS.AES.decrypt(resp.data.toString(), "123");
//   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   console.log(decryptedData)
// }).catch((err) => console.log(err.message));
var socket = io.connect('http://127.0.0.1:3000');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

// fs.writeFile('file.txt', file, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });