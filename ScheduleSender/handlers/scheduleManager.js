var schedule = require('node-schedule');
let cm = require("./clientManager")
function scheduleManager() {
    this.jobs = {}
    this.init = () => {
        let clientConfig = cm.getClientConfig("1234_submarine")
        let s = new Date(...clientConfig.schedule)
        console.log(s.getTime(), Date.now())
        this.jobs["1234_submarine"] = schedule.scheduleJob(new Date(Date.now() + 4000), () => {
            // this.newJobForId("1234_submarine");
          });
    }
    this.newJobForId = function(id) {
        
        let newS = cm.getClientConfig(id).schedule
        // this.jobs[id].cancel()
        console.log(new Date(...newS))
        this.jobs[id] = schedule.scheduleJob(new Date(...newS), () => {
            console.log("Job started")
            io.emit("Error", "Online")
            this.newJobForId(id);
          });
        return newS
    }
    return this
}

module.exports = scheduleManager