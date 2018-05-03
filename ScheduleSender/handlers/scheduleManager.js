var schedule = require('node-schedule');
let cm = require("./clientManager")
function scheduleManager() {
    this.jobs = {}
    this.init = () => {
        let clientConfig = cm.getClientConfig("1234_submarine")
        let s = new Date(...clientConfig.schedule)
        console.log(s.getTime(), Date.now())
        this.jobs["1234_submarine"] = schedule.scheduleJob(new Date(Date.now() + 3000), () => {
            console.log("Job started")
            io.emit("Error", "Online")
            // this.newJobForId("1234_submarine");
          });
    }
    this.newJobForId = function(id) {
        
        let clientConfig = cm.getClientConfig(id)
        let delta = clientConfig.scheduleDelta;
        let newS = new Date(Date.now() + delta);
        console.log(newS.getTime(), Date.now())
        clientConfig.schedule = [newS.getFullYear(), newS.getMonth(), newS.getDay(), newS.getHours(), newS.getMinutes(), newS.getSeconds()]
        console.log(clientConfig.schedule)
        cm.setClientConfig(id, clientConfig)
        this.jobs[id] = schedule.scheduleJob(newS, () => {
            console.log("Job started")
            io.emit("Error", "Online")
            this.newJobForId(id);
          });
        return newS
    }
    return this
}

module.exports = scheduleManager