var CryptoJS = require("crypto-js");
let passwordGenerator = require("password-generator")
 
// Encrypt 
let key = passwordGenerator(64, false)
var ciphertext = CryptoJS.AES.encrypt('my message', key);
 
// Decrypt 
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext);

var CryptoJS = require("crypto-js");
 
var data = [{id: 1}, {id: 2}]
 
// Encrypt 
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key);
console.log(ciphertext);
 
// Decrypt 
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key);
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
console.log(decryptedData);