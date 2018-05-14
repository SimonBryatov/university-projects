var schedule = require('node-schedule');
let cm = require("./configManager")
const SHA384 = require("crypto-js/sha384");
const tN = require("./toggleN")
function scheduleManager() {
    this.sendJob = null
    this.networkJob = null
    this.newJob = (initTest) => {
        let config = cm.getConfig();
        msgKey = config.msgKey;
        clientKey = config.clientKey;
        console.log(new Date(...cm.getConfig().schedule).getTime())
        let newDate = new Date(...cm.getConfig().schedule);
        console.log(`New date`, new Date(initTest || newDate.getTime()).getTime())
        this.networkJob = schedule.scheduleJob(new Date(initTest - 300 || newDate.getTime() - 300), () => {
            tN(1);
            setTimeout(() => {
            tN();
            }, 1000)
        }) 
        this.sendJob = schedule.scheduleJob(new Date(initTest || newDate.getTime()), () => {
            console.log("Job started")
            socket.emit('requestData', { id: config.id, clientKey: clientKey })
            config.clientKey = SHA384(clientKey).toString()
            config.msgKey = SHA384(SHA384(msgKey)).toString()
            cm.setConfig(config)
            //this.newJob();
          });
    }
    return this
}

module.exports = scheduleManager