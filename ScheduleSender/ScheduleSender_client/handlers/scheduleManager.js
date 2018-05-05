var schedule = require('node-schedule');
let cm = require("./configManager")
const SHA384 = require("crypto-js/sha384");
function scheduleManager() {
    this.job = null
    this.newJob = (initTest) => {
        let config = cm.getConfig();
        msgKey = config.msgKey;
        clientKey = config.clientKey;
        config.clientKey = SHA384(clientKey).toString()
        config.msgKey = SHA384(SHA384(msgKey)).toString()
        cm.setConfig(config)
        console.log(new Date(...cm.getConfig().schedule).getTime())
        let newDate = new Date(...cm.getConfig().schedule);
        console.log(`New date`, new Date(initTest || newDate.getTime() + 4000).getTime())
        this.job = schedule.scheduleJob(new Date(initTest || newDate.getTime()), () => {
            console.log("Job started")
            
            socket.emit('requestData', { id: config.id, clientKey: clientKey })
            //this.newJob();
          });
    }
    return this
}

module.exports = scheduleManager