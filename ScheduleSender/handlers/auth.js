var jsonfile = require('jsonfile')
let path = require("path")
const chalk = require("chalk")
var file = './clients.json'
        module.exports = (io, s_data, s_id, eventName, onSuccess) => {
            let ledger = jsonfile.readFileSync(file);
            let clientEntry = ledger[s_data.id]
            if (clientEntry) {
                if (clientEntry.clientKey === s_data.clientKey) {
                console.log(chalk.black.bgCyan(eventName) + chalk.yellow(' event') + ": Authorized client with id: " + s_data.id);
                onSuccess(clientEntry);
                } else {
                  console.log("Declined connection with id: " + s_id);
                  io.to(s_id).emit('Error', "Error! Not Authorized")
                };
        }
    }