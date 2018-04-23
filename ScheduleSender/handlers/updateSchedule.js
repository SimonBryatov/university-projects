const aes = require('./aes')
module.exports = (clientConfig) => {   
   return aes.encrypt(clientConfig.schedule, clientConfig.msgKey)
}