var schedule = require('node-schedule');
let cm = require("./configManager")
function scheduleManager() {
    this.job = null
    this.newJob = () => {
        console.log(cm.getConfig())
        this.job = schedule.scheduleJob(new Date(...cm.getConfig().schedule), () => {
            console.log("Job started")
            socket.emit("Hello", "Online")
          });
    }
    return this
}

module.exports = scheduleManager