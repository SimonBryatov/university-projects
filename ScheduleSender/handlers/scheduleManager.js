var schedule = require('node-schedule');
let cm = require("./clientManager");
let tN = require("./toggleN")

function scheduleManager() {
    this.jobs = {}
    this.init = () => {
        let configs = cm.getAllConfigs()
        // let s = new Date(...clientConfig.schedule)
        //console.log(s.getTime(), Date.now())
        // this.jobs[id] = schedule.scheduleJob(new Date(Date.now() + 1000), () => {
        tN();
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
            // tN(1)
            // setTimeout(() => {
            //     tN();
            // }, 1000)
            //handleNetwork

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