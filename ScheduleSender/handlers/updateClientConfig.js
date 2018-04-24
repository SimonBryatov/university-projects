var jsonfile = require('jsonfile')
let clientConfigs = jsonfile.readFileSync("./configs/clients.json");

module.exports = (id, newClientConfig) => {
    clientConfigs[id] = newClientConfig;
    jsonfile.writeFileSync("./configs/clients.json", clientConfigs, {spaces: 2, EOL: '\r\n'})
}