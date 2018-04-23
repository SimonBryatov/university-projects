var CryptoJS = require("crypto-js");
let passwordGenerator = require("password-generator")
let aes = require("./handlers/aes")
 
// Encrypt 
let key = passwordGenerator(64, false)
let d = "schedule:"
let jsonData = JSON.stringify(d)
var ciphertext = CryptoJS.AES.encrypt("3213123213", key).toString();
console.log(ciphertext)
 
// Decrypt 
var bytes  = CryptoJS.AES.decrypt(ciphertext, key);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);

palintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);

// var CryptoJS = require("crypto-js");
 
// var data = [{id: 1}, {id: 2}]
 
// // Encrypt 
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key);
// console.log(ciphertext);
 
// // Decrypt 
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key);
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
// console.log(decryptedData);