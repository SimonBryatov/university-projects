var CryptoJS = require("crypto-js");
module.exports = {
    encrypt(data, key) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    },
    decrypt(data, key) {
        return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    }
}