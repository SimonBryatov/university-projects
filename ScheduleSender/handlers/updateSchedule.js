const CryptoJS = require("crypto-js");
  
module.exports = (key) => {

    let data = {schedule: "5 * * * * *"}
    let jsonData = JSON.stringify(data)
    
    // Encrypt 
    let encryptedResponse = CryptoJS.AES.encrypt(jsonData, key);
    console.log(encryptedResponse.toString())
    return encryptedResponse
}