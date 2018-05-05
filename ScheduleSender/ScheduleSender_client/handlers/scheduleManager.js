var schedule = require('node-schedule');
let cm = require("./configManager")
function scheduleManager() {
    this.job = null
    this.newJob = () => {
        let config = cm.getConfig();
        console.log(cm.getConfig(), new Date(...cm.getConfig().schedule))
        this.job = schedule.scheduleJob(new Date(...cm.getConfig().schedule), () => {
            console.log("Job started")
            socket.emit("Hello", "Online")
            socket.emit('requestData', { id: config.id, clientKey: config.clientKey })
            this.newJob();
          });
    }
    return this
}

module.exports = scheduleManager