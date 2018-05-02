var jsonfile = require('jsonfile')
var file = './configs/clients.json'
var schedule = require('node-schedule');
function scheduleManager() {
    this.jobs = {}
    this.init = () => {
        ledger = jsonfile.readFileSync(file);
        let userSchedule = ledger["1234_submarine"].schedule
        let userConnectionDate = new Date(...userSchedule)
        console.log(userConnectionDate.getTime(), Date.now())
        this.jobs["1234_submarine"] = schedule.scheduleJob(userConnectionDate, function(){
            console.log("Job started")
            io.emit("Error", "Online")
          });
    }
    this.newJobForId = (id) => {
        ledger = jsonfile.readFileSync(file);
        let delta = ledger["1234_submarine"].scheduleDelta
        let newSchedule = new Date(Date.now() + delta);
        this.jobs[id] = schedule.scheduleJob(userConnectionDate, function(){
            console.log("Job started")
            io.emit("Error", "Online")
          });
        return newSchedule
    }
    return this
}

module.exports = scheduleManager