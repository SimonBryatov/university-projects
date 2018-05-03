var jsonfile = require('jsonfile');
var file = './configs/clients.json';
module.exports = {
    getClientConfig(id)  {
    let ledger = jsonfile.readFileSync(file);
    let clientConfig = ledger[id]
    return clientConfig
},
    setClientConfig(id, config) {
            let ledger = jsonfile.readFileSync(file);
            ledger[id] = config;
            jsonfile.writeFileSync("./configs/clients.json", ledger, {spaces: 2, EOL: '\r\n'})
    }
}