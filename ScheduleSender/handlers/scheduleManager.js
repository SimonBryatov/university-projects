var schedule = require('node-schedule');
let cm = require("./clientManager")

function scheduleManager() {
    this.jobs = {}
    this.init = () => {
        let configs = cm.getAllConfigs()
        // let s = new Date(...clientConfig.schedule)
        //console.log(s.getTime(), Date.now())
        // this.jobs[id] = schedule.scheduleJob(new Date(Date.now() + 1000), () => {
            for (id in configs) {
                console.log(id)
                this.newJobForId(id);
            }
        // });
    }
    this.newJobForId = function (id) {

            let newS = cm.updateCilentSchedule(id)
            // this.jobs[id].cancel()
            // console.log(id)
            // console.log(new Date(...newS))
            this.jobs[id] = schedule.scheduleJob(new Date(...newS), () => {
                // console.log("Job started")
                // io.emit("Error", "Online")
                this.newJobForId(id);
            });
            return newS
        },

        this.addNewClients = () => {

        }
    return this
}

module.exports = scheduleManager