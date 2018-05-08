var schedule = require('node-schedule');
let cm = require("./clientManager");
let tF = require("./toggleFirewall")

function scheduleManager() {
    this.jobs = {}
    this.init = () => {
        let configs = cm.getAllConfigs()
        // let s = new Date(...clientConfig.schedule)
        //console.log(s.getTime(), Date.now())
        // this.jobs[id] = schedule.scheduleJob(new Date(Date.now() + 1000), () => {
        tF();
        setTimeout(() => {
            for (id in configs) {
                console.log(id)
                this.newJobForId(id);
            }
            // this.newJobForId("1234_submarine")
        }, 2000)
        // });
    }
    this.newJobForId = function (id) {


            let newS = cm.updateClientSchedule(id)
            // tF(1)
            // setTimeout(() => {
            //     tF();
            // }, 1000)
            //handleNetwork

            // this.jobs[id].cancel()
            // console.log(id)
            // console.log(new Date(new Date(...newS).getTime()) - 200)
            this.jobs[id] = schedule.scheduleJob(new Date(new Date(...newS).getTime()) - 300, () => {
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