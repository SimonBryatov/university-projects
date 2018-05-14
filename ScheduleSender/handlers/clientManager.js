var jsonfile = require('jsonfile');
var file = './configs/clients.json';
const SHA384 = require("crypto-js/sha384");
module.exports = {
    getAllConfigs() {
        return jsonfile.readFileSync(file);
    },

    getClientConfig(id)  {
    let ledger = jsonfile.readFileSync(file);
    let clientConfig = ledger[id]
    return clientConfig
},
    setClientConfig(id, config) {
            let ledger = jsonfile.readFileSync(file);
            ledger[id] = config;
            jsonfile.writeFileSync("./configs/clients.json", ledger, {spaces: 2, EOL: '\r\n'})
    },

    updateClientSchedule(id) {
        let clientConfig = this.getClientConfig(id)
        let delta = clientConfig.scheduleDelta;
        let newS = new Date(Date.now() + delta + 1000);
        clientConfig.schedule = [newS.getFullYear(), newS.getMonth(), newS.getDate(), newS.getHours(), newS.getMinutes(), newS.getSeconds()]
        console.log(chalk.magenta(`Generated schedule: [${clientConfig.schedule}] for ${id}`))
        this.setClientConfig(id, clientConfig)
        return clientConfig.schedule
    },
    
}